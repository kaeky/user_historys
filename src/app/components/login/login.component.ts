import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userForm = this.fb.group({
    name: ['',Validators.required],
    lastName: ['',Validators.required],
    email: ['',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: ['',Validators.required]
  });
  loginForm = this.fb.group({
    email: ['',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: ['',Validators.required]
  });
  constructor(private authService: AuthService, private fb: FormBuilder, private cookie: CookieService, private router: Router) {

  }
  login(){
    if(this.loginForm.invalid){
      return
    }
    this.authService.login(this.loginForm.value).subscribe((data:any)=>{
      localStorage.setItem("token",data.jwt);
      this.cookie.set(data.name,data.jwt,0.1,'/');
     // this.router.navigate(['/dashboard'])
      Swal.fire("Ok", "Ha iniciado sesion correctamente!", "success").then((result:any)=>{
        if(result.isConfirmed){
          this.router.navigate(['/dashboard/project'])
        }
      })
    },(err)=>{
      console.log(err)

      Swal.fire("Error",err.error,"error")
    })
  }

  ngOnInit(): void {
    //this.loginForm.valueChanges.subscribe(console.log)
  }

  register() {
    if(this.userForm.invalid){
      return
    }
    this.authService.register(this.userForm.value).subscribe(()=>{
      Swal.fire("Registro Exitoso","El usuario se ha registrado con exito!","success");
    },(err)=>{
      Swal.fire("Error",err.error,"error");
    })
  }


}
