import {ChatMessageHandler} from "./chat-message-handler";
import {ISocketConnection} from "../socket-connector";
import {filter, first} from 'lodash';
import {validateJwt} from "../../jwt/jwt-validator";
import {decode} from "jsonwebtoken";

export interface IMessageHandler {
  messageType: string;
  canHandle: (messageType: string) => boolean;
  handle: (payload: IncomingMessage) => [OutgoingMessage, boolean];
}

type MessageBody = any;
type MessageType = string;

type Message = {
  type: MessageType,
  payload: MessageBody,
}

export type IncomingMessage = Message & {
  token: string;
}

export type OutgoingMessage = Message & {
  author: string
}

export class MessageHandler {

  private readonly handlers: IMessageHandler[];

  constructor(private socketConnection: ISocketConnection) {
    this.handlers = [
      new ChatMessageHandler()
    ];
  }

  public async handleMessage(stringPayload: string) {
    let message = this.parsePayload(stringPayload) as IncomingMessage;

    if (!message) return this.respondWithError('Message had improper format. try sending a json message!');
    if (!message.type || !message.payload || !message.token)
      return this.respondWithError('Json message is missing the "type", "payload" and/or "token" property!')

    const user = await validateJwt(decode(message.token));
    if (!user) return this.respondWithError('No user found for given token!');

    const handler = this.getMessageHandler(message);
    if (!handler) return this.respondWithError(`Server does not understand messages of type "${message.type}, must be any of [${this.handlers.map(h => h.messageType).join(', ')}]"`)

    const [responseMessage, broadcast] = handler.handle({...message, token: user.username});
    this.respondWith(responseMessage, false, broadcast)
  }

  private getMessageHandler(payload): IMessageHandler | undefined {
    return first(filter(this.handlers, (handler) => handler.canHandle(payload.type)));
  }

  private parsePayload(stringPayload: string): Record<string, any> | null {
    try {
      return JSON.parse(stringPayload);
    } catch (error) {
      console.error(error.message)
      return null;
    }
  }

  private respondWith(answer: OutgoingMessage, error: boolean = false, broadcast = false) {
    if (broadcast) this.socketConnection.broadcast(answer);
    else this.socketConnection.sendMessage(answer, error);
  }

  private respondWithError(message: string) {
    this.respondWith({type: 'error', payload: message, author: 'system'}, true)
  }
}
