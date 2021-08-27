import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../../interfaces/project';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  @Output() disparadorproject: EventEmitter<any>= new EventEmitter<any>()
  //url = 'http://localhost:3000/api/project'
  url = 'http://190.26.143.126:3000/api/project'
  constructor(private http:HttpClient) {

  }
  getAll(id: string){
    return this.http.get(`${this.url}/${id}`)
  }
  getCompany(id: string){
    return this.http.get(`${this.url}/${id}`)
  }
  agregar(project: Project){
    return this.http.post(`${this.url}/`,project)
  }
  editar(id: string, project: Project){
    return this.http.put(`${this.url}/${id}`,project)
  }
}
