import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ChatService} from "../../services/chat.service";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Component({
  selector: 'handson-chat-page',
  templateUrl: './chat-page.component.html',
})
export class ChatPageComponent implements OnInit {

  public messages?: Observable<any[]>;
  public message: string = '';

  public readonly username: string | null;

  @ViewChild('chatMessages') private chatContainer?: ElementRef;

  constructor(private chat: ChatService) {
    this.username = localStorage.getItem('user');
  }

  ngOnInit() {
    this.chat.connect();
    this.messages = this.chat.messages$
      .pipe(tap(() => {
        setTimeout(() => {
          if (this.chatContainer) {
            this.chatContainer.nativeElement.scrollTop = this.chatContainer?.nativeElement.scrollHeight;
          }
        })
      }));
  }

  sendMessage() {
    if (!this.message) return;
    this.chat.sendMessage(this.message);
    this.message = '';
  }
}
