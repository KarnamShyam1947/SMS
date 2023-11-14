import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = "http://localhost:3000/student";

  constructor(
    private http:HttpClient
  ) { }

  setPassword(id:any, data:any) {
    let url = `${this.baseUrl}/${id}`;
    return this.http.put(url, data);
  }

  getAllStudentDetails(){ // for login
    let url = `${this.baseUrl}/student`;

    return this.http.get(url);
  }
}
