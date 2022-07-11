import { Injectable } from '@angular/core';
import { ChatMessageDto } from './models/chatMessagedto';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  webSocket!: WebSocket;
  chatMessages:ChatMessageDto[] = [];
  constructor() { }

  public openWebSocket(){
    this.webSocket = new WebSocket('ws://localhost:8080/chat');

    this.webSocket.onopen = (event)=>{
      console.log('Open:',event);
    };
    this.webSocket.onmessage = (event)=> {
     const chatMessagedto = JSON.parse(event.data);
     this.chatMessages.push(chatMessagedto);
    };
    this.webSocket.onclose = (event)=>{
      console.log('Close:',event);
    };
  }
  public sendMessage(chatMessagedto:ChatMessageDto){
    this.webSocket.send(JSON.stringify(chatMessagedto));
  }
  public EndMessage(chatMessagedto:ChatMessageDto){
  this.webSocket.send(JSON.stringify(chatMessagedto));

  }
  public closeWebsocket(){
    this.webSocket.close();
  }
}



