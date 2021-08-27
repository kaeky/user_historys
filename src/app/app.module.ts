import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from './interceptors/token.service';
import { NavbarComponent } from './components/util/navbar/navbar.component';
import { ProjectComponent } from './components/project/project.component';
import { UserhistoryComponent } from './components/userhistory/userhistory.component';
import { TicketComponent } from './components/ticket/ticket.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    ProjectComponent,
    UserhistoryComponent,
    TicketComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
