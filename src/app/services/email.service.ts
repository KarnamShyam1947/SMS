import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import emailjs from "@emailjs/browser";

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(
    private http:HttpClient
  ) { }

  async sendVerificationEmail(to:any, name:any, url:any) {
    emailjs.init('fS2LT7fGZxzuyZUnO');

    let response = await emailjs.send(
      "service_vkx5ii8",
      "template_u4xpipe",{
        subject: "Password setup",
        reply: "karnamshyam9009@gmail.com",
        to: to,
        name: name,
        url: url,
      }
    );
  }

}
