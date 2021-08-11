# RxJS Behaviour subject

With our current subject we are able to subscribe to new value and update the value using the next method. One thing that
is missing is a way to fetch the current value. We need this to update the list of messages. There is 1 class in RxJS 
that is able to fetch the current value. This is the `BehaviorSubject`. A behaviour subject is just like a regular subject
with the exception that it needs an initial value, and you can get the current value.

Create a new BehaviorSubject in the ChatService which holds a list of chat messages. The initial messages will be an empty
array.

```typescript
private messages: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
```

Within the subscribe function of our previous subject, get the message of the payload and add it to the current list of 
messages.

```typescript
const {message} = payload;
const currentMessages = this.messages.getValue();

const newMessages = [
    ...currentMessages,
    {
        text: message.payload,
        author: message.author,
    }
];
```

Lastly, update the value of the behaviour subject by calling `next` with the new list of messages

```typescript
this.messages.next(newMessages)
```
 
 ## Exposing our messages to the chat
 
 We need to create a public variable/method to enable our chat page component to access the chat messages. The problem
 of making the behaviour subject public is that everyone can push new messages into the chat. To fix this, we can 
 create a get method that returns the behaviour subject as a regular observable. 
 
 ```typescript
public get messages$() {
    return this.messages.asObservable();
}
```
 
## Sending messages

To send a message on the chat we need to expose a sendMessage method. Since the webSocketServer also returns send
message to us we don't need to add our own messages to the observable. This happens automatically.

```typescript

public sendMessage(message: string, type: string = 'chat') {
    if (!this.ws) return;
    if (this.ws.readyState !== WebSocket.OPEN) return;
    
    this.ws.send(JSON.stringify({
        payload: message,
        type,
        token: ''
    }))
}

```
 
> Note: we make sure that the websocket has been created and that the connection is 'OPEN' before we send messages.  
 
## Authorizing
 
Messages send to the server must contain a payload, a type and an authorization token. This token is returned by the API 
when we do the login call back in the user service. In the user service we can add another RxJS operator, namely: tap.

The tap function allows is to read the data that comes though the stream of an observable without modifying it. Using 
this function allows us to read the response (token) and save it to localstorage. This will then allow us to use that token
in the chat service.

```typescript
login({username, password}: Credentials) {
    return this.http.post<any>('/api/users/authenticate', {username, password})
        .pipe(tap(response => {
            localStorage.setItem('user', username)
            localStorage.setItem('token', response.token)
         }))
}
```

With the token stored in localStorage, we can read back from localStorage when we send a message

```typescript
this.ws.send(JSON.stringify({
    payload: message,
    type,
    token: localStorage.getItem('token')
}))
```

## Distinguishing messages

Since we now saved our account details (username and token) we can use this data to distinguish messages send from
messages received by others. Prior to publishing the new messages we can add an extra field called messageType. In
this field we can store the type of message

```typescript
const {message} = payload;
const messageType = this.getMessageType(message.author);
const currentMessages = this.messages.getValue();

const newMessages = [
    ...currentMessages,
    {
        text: message.payload,
        author: message.author,
        messageType
    }
];
```

```typescript
private getMessageType(author: string) {
    if (author === 'system') return 'system-message'
    if (author === localStorage.getItem('user')) return 'sent-message'

    return 'received-message'
}
```

-----

[<< next exercise: Angular async pipe >>](./09-observable-in-html.md)

