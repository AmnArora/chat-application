import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ChatService {

  constructor(private http: HttpClient) { }

  getChatsByRoom(roomId) {
    return this.http.get(`/chat/${roomId}`);
  }

  saveChat(chat) {
    return this.http.post('/chat', chat);
  }
}
