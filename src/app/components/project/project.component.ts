import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ProjectService } from '../../services/project/project.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../interfaces/project';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  @ViewChild('EditProject', { static: true }) EditProject!: ModalDirective;
  constructor(private projectService: ProjectService, private fb: FormBuilder, private routes : Router, private route: ActivatedRoute) { }
  datosproject = [
    { companyFK: '',
      companyname: '',
      description: '',
      id_project: '',
      id_user: '',
      name: '',
      nit: ''
    },
  ];
  idsend: string | undefined = ' ';
  projectForm = this.fb.group({
    name: ['',Validators.required],
    description: ['',Validators.required]
  });

  datasend = {
    name: '',
    description: '',
    companyFK: ''
  }

  editForm = this.fb.group({
    id_project: [''],
    name: ['',Validators.required],
    description: ['',Validators.required]
  })
  ngOnInit(): void {
    this.getprojects()
  }

  agregar(): void{
    this.datasend.name = this.projectForm.value.name
    this.datasend.description = this.projectForm.value.description
    this.projectService.agregar(this.datasend).subscribe((data)=>{
      this.routes.navigateByUrl('/', {skipLocationChange: true}).then(()=> this.routes.navigate(['dashboard/project']));
        Swal.fire("OK", "Se ha agregado correctamente","success").then((success)=>{
        }).catch((err)=>{
          console.log(err)
        })
    })
  }
  getprojects(){
    this.projectService.disparadorproject.subscribe((data)=>{
      this.datosproject = data
      this.datasend.companyFK = this.datosproject[0].companyFK
      //console.log(this.datosproject)
    })
  }
  verproyecto(id: any ){
    console.log(id)
    //this.routes.navigate(['../userhistory'], { relativeTo: this.route })
  }
  FormEdit(data: Project){
    console.log(data)
    this.idsend = data.id_project;
    this.EditProject.show();
    this.editForm.patchValue(data)
  }
  edit(){
    let data = this.editForm.value
    //console.log(data)
    this.projectService.editar(data.id_project,data).subscribe((data:any)=>{
      Swal.fire("OK", data.message, "success").then((result)=>{
        this.routes.navigateByUrl('/', {skipLocationChange: true}).then(()=> this.routes.navigate(['dashboard/project']));
      }).catch((err)=>{
        console.log(err)
      })
    })
    //console.log( this.editForm.value)
  }
  endesarrollo(){
    Swal.fire("Información", "Esto aun esta en desarollo", "info")
  }
}
