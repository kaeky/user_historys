import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from './components/login/login.component'
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ValidatorGuard } from './guards/validator.guard';
import { ProjectComponent } from './components/project/project.component';
import { UserhistoryComponent } from './components/userhistory/userhistory.component';
import { TicketComponent } from './components/ticket/ticket.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [ValidatorGuard],
    children:[
      {
        path: 'userhistory',
        component: UserhistoryComponent
      },
      {
        path: 'ticket',
        component: TicketComponent
      },
      {
        path: 'project', component: ProjectComponent, pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
