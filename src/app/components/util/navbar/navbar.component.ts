import { Component, OnInit, Input } from '@angular/core';
import { CompanyService } from '../../../services/company/company.service';
import { Router } from '@angular/router';
import { UserhistoryService } from '../../../services/userhistory/userhistory.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private companyService: CompanyService,
              private routes: Router,
              private userHistoryService: UserhistoryService
  ) { }
  public datos  =  { nit: '', companyname: '', id_user: '', name: '' }

  ngOnInit(): void {
    this.companyService.disparadorcompany.subscribe((data)=>{
      this.datos = data
    })
  }
  consultar(){
    console.log(this.datos)
  }
  cerrarsesion(){
    localStorage.removeItem('token')
    this.routes.navigate(['/'])
  }
  proyectos(){
    this.routes.navigateByUrl('/', {skipLocationChange: true}).then(()=> this.routes.navigate(['dashboard/project']));
  }
  userhistory(){
    this.userHistoryService.getAll(this.datos.id_user).subscribe((data:any)=>{
      this.userHistoryService.disparadoruserHistory.emit(data)
    })
  }
}
