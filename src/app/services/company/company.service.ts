import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  @Output() disparadorcompany: EventEmitter<any>= new EventEmitter<any>()
  //url = 'http://localhost:3000/api/company'
  url = 'http://190.26.143.126:3000/api/company'
  constructor(private http:HttpClient) {

  }

  getAll(){
    return this.http.get(`${this.url}/list`)
  }
  getCompany(id: string){
    return this.http.get(`${this.url}/${id}`)
  }
}
