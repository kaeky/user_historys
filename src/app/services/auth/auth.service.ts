import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../interfaces/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  //url = 'http://localhost:3000/api/user'
  url = 'http://190.26.143.126:3000/api/user'
  constructor(private http:HttpClient) {

  }
  login(user: User){
    return this.http.post(`${this.url}/login`,user)
  }
  register(user: User){
    return this.http.post(`${this.url}/register`,user)
  }

  update(id: string, updatedUser: User){
    return this.http.put(`${this.url}/${id}`,updatedUser);
  }
  verify(){
    return this.http.get(`${this.url}/verify`)
  }
}
