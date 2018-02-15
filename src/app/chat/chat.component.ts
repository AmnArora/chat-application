import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ChatService } from '../chat.service';

import * as io from "socket.io-client";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  user;
  chats: any;
  isUserJoined: Boolean;
  msg: any;
  socket;

  constructor(private chatService: ChatService) {
    this.user = {
      name: "",
      room: ""
    }
    this.msg = "";
    this.socket = io();
  }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem("user"));
    if(user !== null) {
      this.chatService.getChatsByRoom(user.room).subscribe((chats) => {
        this.chats = chats;
      });
      this.msg = "";
      this.isUserJoined = true;
    }
    this.bindListeners();
  }

  bindListeners() {
    var self = this;
    this.socket.on('newMsg', function (data) {
      if (data.message.room === this.user.room) {
        self.chats.push(data.message);
        self.msg = "";
      }
    }.bind(this));
  }

  onJoinRoom() {
    localStorage.setItem("user", JSON.stringify(this.user));
    this.chatService.getChatsByRoom(this.user.room).subscribe((chats) => {
      this.chats = chats;
    });
    this.isUserJoined = true;
    this.socket.emit("saveMsg", { room: this.user.room, name: this.user.name, message: "Joined the room", timestamp: Date.now() })
  }

  send() {
    this.chatService.saveChat({ room: this.user.room, name: this.user.name, message: this.msg, timestamp: Date.now() }).subscribe((chat) => {
      this.socket.emit("saveMsg", chat);
    });
  }

  leaveChat() {
    var user = JSON.parse(localStorage.getItem("user"));
    this.socket.emit('saveMsg', { room: user.room, name: user.name, message: 'Left this room', timestamp: Date.now() });
    localStorage.removeItem("user");
    this.isUserJoined = false;
  }
}
