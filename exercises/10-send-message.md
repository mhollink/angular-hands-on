# Sending chat messages

Earlier we added the `sendMessage` to the chat service. Updating the chat page with an input, and a sendMessage method is 
all that is left. 

First add a field to the controller that stores the message

```typescript
public message: string = '';
```

Then add a method that sends the message and resets the value

```typescript
sendMessage() {
    if (!this.message) return;
    this.chat.sendMessage(this.message);
    this.message = '';
}
```

Lastly, add the following html snippet bellow the chat messages.

```html

<section id="message-form">
  <form class="chat-form">
    <mat-form-field appearance="standard">
      <input matInput placeholder="Type your message..." [(ngModel)]="message" [ngModelOptions]="{standalone: true}">
      <button mat-button color="primary" (click)="sendMessage()" matSuffix>send</button>
    </mat-form-field>
  </form>
</section>
```

Now you should be able to send messages and see messages that are send by others on the same server.