# Websocket connection 

To start, we need a service which connects to the websocket and handles the interactions.

```shell script
nx g s service/chat
```

This chat service will first need to connect with the web socket server and send messages over the connection. 

```typescript
export class ChatService {
    
    public connect() {
    }

    public sendMessage(message: string, type: string) {
    }
}
```

Since the main purpose of the chat service is to send 'chat' messages, lets add a default value to type.

```typescript
sendMessage(message: string, type: string = 'chat')
```

## Connection

There are a few methods on the WebSocket interface that are of use for our chat service. These are:
- onmessage
- onerror
- onclose

Since these methods match neatly with the interface of an RxJS subject we can bind the methods to the subject. This
allows us to subscribe on multiple places to the messages that come in. Furthermore, we can make use of the RxJS 
operators.

Start by adding two optional variables to the service.

```typescript
export class ChatService {
    private subject?: Subject<MessageEvent>;
    private ws?: WebSocket
}
``` 

Within the connect method, check if the subject has been created, otherwise create a new one.

```typescript
public connect() {
    if (this.subject) return;

    this.subject = this.create('ws://localhost:3333');
}
```

The create function should establish a new websocket connection and bind the earlier mentioned methods to 
the corresponding methods on the subject. This subject needs to be initialized as well.

```typescript
private create(url: string): Subject<MessageEvent> {
    this.ws = new WebSocket(url);
    
    this.subject = new Subject<MessageEvent>();
    
    this.ws.onmessage = this.subject.next.bind(this.subject);
    this.ws.onerror = this.subject.error.bind(this.subject);
    this.ws.onclose = this.subject.complete.bind(this.subject);
    
    return this.subject;
}
```

> note: We assign a new function to the onmessage of our websocket, which is the next function of the subject. 
> With doing so, the next function of the subject is triggered each time the onmessage is called by the internals
> of the websocket. the `bind` that is happening ensures that we dont lose the reference of `this` in the callback.

To see the incoming messages lets subscribe to the subject in our connect function and console log the results.

```typescript
public connect() {
    if (this.subject) return;
    
    this.subject = this.create('ws://localhost:3333');
    this.subject
        .subscribe(payload => {
            console.log(payload);
        })
}
```

## Connecting in a component

To see if our connection works we need to call the connect-method from somewhere in the application. A good place would
be where we are actually gonna need the messages. So let's create a chat component and finish the routing for the login 
page. 

First generate the component using the CLI

```shell script
nx g c components/chat-page
```

And then connect it to the routing in the app.module

```typescript
const routes: Routes = [
    {path: 'login', component: LoginPageComponent },
    {path: 'registration', component: RegistrationPageComponent },
    {path: 'chat', component: ChatPageComponent },
    {path: '', redirectTo: '/login', pathMatch: 'full'},
]
```

With this done we should see `chat-page works` when we authenticate with some user credentials (or navigate in the url 
to /chat). Make sure the ChatPageComponent implements the `OnInit` interface and injects the chat service.

```typescript
export class ChatPageComponent implements OnInit {
    constructor(private chat: ChatService) { }
    
    ngOnInit() {
    }
}
```

The ngOnInit is called when the component gets loaded in. This is the perfect place to call the connect-method.

```typescript
ngOnInit() {
    this.chat.connect();
}
```

Loading the page should show the `console.log` that we placed earlier in the subscribe-method in our chat service.

-----

[<< next exercise: RxJS Operators >>](./07-rxjs-operators.md)


