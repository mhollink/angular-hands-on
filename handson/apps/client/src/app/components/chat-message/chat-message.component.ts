import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'handson-chat-message',
  templateUrl: './chat-message.component.html',
})
export class ChatMessageComponent implements OnInit {

  @Input() message: any;

  constructor() { }

  ngOnInit(): void {
  }

}
