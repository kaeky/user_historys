import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Userhistory } from '../../interfaces/userhistory';


@Injectable({
  providedIn: 'root'
})
export class UserhistoryService {
  @Output() disparadoruserHistory: EventEmitter<any>= new EventEmitter<any>()
  //url = 'http://localhost:3000/api/userhistory'
  url = 'http://190.26.143.126:3000/api/userhistory'
  constructor(private http:HttpClient) {

  }
  getAll(id: string){
    return this.http.get(`${this.url}/${id}`)
  }
  agregar(userHistory: Userhistory ){
    return this.http.post(`${this.url}/`,userHistory)
  }
  editar(id: string, userHistory: Userhistory){
    return this.http.put(`${this.url}/${id}`,userHistory)
  }
}
