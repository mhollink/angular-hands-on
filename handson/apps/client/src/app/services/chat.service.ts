import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private subject?: Subject<MessageEvent>;
  private ws?: WebSocket

  private messages: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  public connect() {
    if (this.subject) return;

    this.subject = this.create('ws://localhost:3333');
    this.subject
      .pipe(
        map(messageEvent => messageEvent.data),
        map(event => JSON.parse(event)),
      )
      .subscribe(payload => {
        if (payload.error) {
          return;
        }

        const {message} = payload;
        const messageType = this.getMessageType(message.author);

        this.messages.next([
          ...this.messages.getValue(),
          {
            text: message.payload,
            author: message.author,
            messageType
          }
        ])
      })
  }

  public sendMessage(message: string, type: string = 'chat') {
    if (!this.ws) return;
    if (this.ws.readyState !== WebSocket.OPEN) return;

    this.ws.send(JSON.stringify({
      payload: message,
      type,
      token: localStorage.getItem('token')
    }))
  }

  public get messages$() {
    return this.messages.asObservable();
  }

  private create(url: string): Subject<MessageEvent> {
    this.ws = new WebSocket(url);

    this.subject = new Subject<MessageEvent>();

    this.ws.onmessage = this.subject.next.bind(this.subject);
    this.ws.onerror = this.subject.error.bind(this.subject);
    this.ws.onclose = this.subject.complete.bind(this.subject);

    return this.subject;
  }

  private getMessageType(author: string) {
    if (author === 'system') return 'system-message'
    if (author === localStorage.getItem('user')) return 'sent-message'

    return 'received-message'
  }
}
