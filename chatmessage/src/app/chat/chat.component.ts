import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChatMessageDto } from '../models/chatMessagedto';
import { WebSocketService } from '../websocket.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit,OnDestroy {
  onLeave:any;
  constructor(public webSocketService:WebSocketService) { }

  ngOnInit(): void {
    this.webSocketService.openWebSocket();
  }
  ngOnDestroy(): void {
    this.webSocketService.closeWebsocket();
  }
  sendMessage(sendForm:NgForm){
  const chatMessagedto = new ChatMessageDto(sendForm.value.user,sendForm.value.message);
  this.webSocketService.sendMessage(chatMessagedto);
  sendForm.controls.message.reset();
}
Leave(sendForm:NgForm){
   this.onLeave = "LEFT THE CHATROOM";
   const chatMessagedto = new ChatMessageDto(sendForm.value.user,this.onLeave);
  this.webSocketService.sendMessage(chatMessagedto);
  }
}
  

