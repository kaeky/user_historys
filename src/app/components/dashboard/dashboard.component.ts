import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';

import { CompanyService } from '../../services/company/company.service';
import { ModalDirective } from 'angular-bootstrap-md';
import { FormBuilder,  } from '@angular/forms';
import { ProjectService } from '../../services/project/project.service';
import { UserhistoryService } from '../../services/userhistory/userhistory.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('UpdateModal', { static: true }) UpdateModal!: ModalDirective;
  constructor(private authService: AuthService,
              private cookie: CookieService,
              private companyService: CompanyService,
              private fb: FormBuilder,
              private projectService: ProjectService,
              private userHistoryService: UserhistoryService,
              private routes: Router
              ) {
  }
  options = [
    { nit: '1', name: 'Option 1' },
  ];
  selectControl = this.fb.group({
    companyFK :['']
  })
  user = '';
  ngOnInit(): void {
    //this.selectControl.valueChanges.subscribe(console.log)
  }
  ngAfterViewInit(): void{
    this.verificaruser()

  }
  verificaruser(){
    this.authService.verify().subscribe((data:any)=>{
      if(data.message == "Actualizar datos"){
        this.user = data.id;
        this.companyService.getAll().subscribe((data:any)=>{
          this.options = data.data;
        })
        this.UpdateModal.show();
      }else{
        this.companyService.getCompany(data.id).subscribe((data:any)=>{
          this.companyService.disparadorcompany.emit(data)
        })
        if(this.routes.url == "/dashboard/project"){
          this.projectService.getAll(data.id).subscribe((data:any)=>{
            this.projectService.disparadorproject.emit(data)
          })
        }
        if(this.routes.url == "/dashboard/userhistory"){
          this.userHistoryService.getAll(data.id).subscribe((data:any)=>{
            this.userHistoryService.disparadoruserHistory.emit(data)
          })
        }

      }
    })
  }
  vincularse() {
   this.authService.update(this.user, this.selectControl.value).subscribe((data:any)=>{
   })
  }
}

