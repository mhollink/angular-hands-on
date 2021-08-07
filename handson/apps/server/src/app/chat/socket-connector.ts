import * as WebSocket from 'ws';
import * as http from "http";
import {MessageHandler, OutgoingMessage} from "./message/message-handlers";
import {BehaviorSubject} from "rxjs";
import {forEach} from 'lodash';

export interface ISocketConnection {
  sendMessage: (message: OutgoingMessage, error?: boolean) => void;
  broadcast(answer: OutgoingMessage): void;
}

class SocketConnection implements ISocketConnection {

  private messageHandler = new MessageHandler(this);

  public constructor(public readonly connection: WebSocket, public readonly id: number, private readonly clients: BehaviorSubject<SocketConnection[]>) {
    this.initializeListeners();
    this.sendMessage({payload: "Connection Established", type: 'connection', author: 'system'})
  }

  public broadcast(message: OutgoingMessage) {
    forEach(this.clients.getValue(), client => SocketConnection.send(client.connection, message));
  }

  public sendMessage(message: OutgoingMessage, error: boolean = false) {
    SocketConnection.send(this.connection, message, error)
  }

  private static send(connection: WebSocket, message: OutgoingMessage, error: boolean = false) {
    connection.send(JSON.stringify({message, error}));
  }

  private initializeListeners() {
    this.connection.on('message', (message: string) => this.messageHandler.handleMessage(message));
    this.connection.on('error', console.error)
    this.connection.on('close', () => {
      this.clients.next(this.clients.getValue().filter(client => client.id !== this.id));
    })
  }
}

export class SocketConnector {

  private webSocketServer: WebSocket.Server;
  private clientsConnected = 0;
  private readonly clients: BehaviorSubject<SocketConnection[]>;

  public constructor(private server: http.Server) {
    this.clients = new BehaviorSubject<SocketConnection[]>([]);
  }

  public connect() {
    this.webSocketServer = new WebSocket.Server({server: this.server});
    this.webSocketServer.on('error', (error) => this.onError(error));
    this.webSocketServer.on('connection', (connection) => this.connectClient(connection));
  }

  public disconnect() {
    forEach(this.clients, client => client.sendMessage({type: 'shutdown', payload: 'server is shutting down'}));
    this.webSocketServer.close(console.error)
  }

  private connectClient(connection: WebSocket) {
    const id = ++this.clientsConnected;
    const client = new SocketConnection(connection, id, this.clients);
    this.clients.next([...this.clients.value, client]);
  }

  private onError(error: Error) {
    console.log(error.message);
    this.connect(); // reconnect
  }
}

export default SocketConnector;
