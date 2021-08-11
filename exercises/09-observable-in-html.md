# Angular Async pipe

Using an observable in the HTML template of an angular component never has been easier than it is now. With the use
of the built-in async pipe we can tell Angular the value needs to be extracted form the observable. The async
pipe also helps us clean up the memory of the application. Async values will automatically be unsubscribed when the 
component leaves the view. 

first we need to bind the chat messages to a local value inside the component. Within the ngOnInit, after we connect, 
bind the messages to a local variable.

```typescript
public messages?: Observable<any[]>;
```

```typescript
ngOnInit() {
    this.chat.connect();
    this.messages = this.chat.messages$
}
```

With the messages bound to component we can build the template. The chat page must consist of 2 sections. A section that
contains all the messages, and a section with an input to type a new message. 

```html
<section id="messages">
    <div class="message" *ngFor="let message of messages | async" [ngClass]="message.messageType">
        <span>
          <strong *ngIf="message.messageType === 'received-message'"> {{ message.author }} </strong><span> {{message.text}} </span>
        </span>
    </div>
</section>

```

[<< next exercise: Sending messages >>](./10-send-message.md)

