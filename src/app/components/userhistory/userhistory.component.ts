import { Component, OnInit, ViewChild } from '@angular/core';
import { UserhistoryService } from '../../services/userhistory/userhistory.service';
import { ProjectService } from '../../services/project/project.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Userhistory } from '../../interfaces/userhistory';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-userhistory',
  templateUrl: './userhistory.component.html',
  styleUrls: ['./userhistory.component.scss']
})
export class UserhistoryComponent implements OnInit {
  @ViewChild('EditUserHistory', { static: true }) EditUserHistory!: ModalDirective;
  constructor(private userhistoryService: UserhistoryService,
              private projectsService: ProjectService,
              private fb: FormBuilder,
              private routes: Router
  ) { }
  idsend: string | undefined = ' ';
  datosuserhistory = [
    { id_userhistory: '',
      name: '',
      contend: '',
      projectname: '',
      projectFK: ''

    },
  ];
  options = [
    { id_project: '1', name: 'Option 1' },
  ];
  userHistoryadd = this.fb.group({
    name: ['',Validators.required],
    contend: ['',Validators.required],
    projectFK :['',Validators.required]
  })
  editForm = this.fb.group({
    id_userhistory: [''],
    name: ['',Validators.required],
    contend: ['',Validators.required],
    projectFK: ['',Validators.required]
  })
  ngOnInit(): void {
    this.gethistorys()
    this.userHistoryadd.valueChanges.subscribe(console.log)
  }
  gethistorys(){
    this.userhistoryService.disparadoruserHistory.subscribe((data:any)=>{
      this.datosuserhistory = data
      this.projectsService.getAll(data[0].id_user).subscribe((data:any)=>{
        this.options = data
      })
      //console.log(this.datosuserhistory)
    })
  }
  getprojects(){

  }

  agregar() {
    this.userhistoryService.agregar(this.userHistoryadd.value).subscribe((data:any)=>{
      Swal.fire("OK", "Se ha agregado correctamente","success").then((success)=>{
        this.routes.navigateByUrl('/', {skipLocationChange: true}).then(()=> this.routes.navigate(['dashboard/userhistory']));
      })
    },error => {
      if(error.error.error.errno){
        Swal.fire("ERROR", "Porfavor seleccione un proyecto","error")
      }
      else{
        Swal.fire("ERROR", error,"error")
      }
    } )
  }
  endesarrollo(){
    Swal.fire("Información", "Esto aun esta en desarollo", "info")
  }
  FormEdit(data: Userhistory){
     console.log(data)
    this.idsend = data.id_userhistory;
    this.EditUserHistory.show();
    this.editForm.patchValue(data)
  }
  edit(){
    let data = this.editForm.value
    //console.log(data)
    this.userhistoryService.editar(data.id_userhistory,data).subscribe((data:any)=>{
      Swal.fire("OK", data.message, "success").then((result)=>{
        this.routes.navigateByUrl('/', {skipLocationChange: true}).then(()=> this.routes.navigate(['dashboard/userhistory']));
      }).catch((err)=>{
        console.log(err)
      })
    })
    //console.log( this.editForm.value)
  }
}
