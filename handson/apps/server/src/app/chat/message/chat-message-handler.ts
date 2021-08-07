import {IMessageHandler, IncomingMessage, OutgoingMessage} from "./message-handlers";

export class ChatMessageHandler implements IMessageHandler {

  public readonly messageType = 'chat';

  canHandle(messageType: string): boolean {
    return messageType === this.messageType;
  }

  handle({payload, token}: IncomingMessage): [OutgoingMessage, boolean] {
    return [{payload, type: 'response-message', author: token}, true];
  }

}
