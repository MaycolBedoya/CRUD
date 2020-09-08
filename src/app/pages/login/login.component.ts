import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginModel } from 'src/app/models/login.model';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin:LoginModel;
  remindMe=false;

  constructor(private auth:UsersService,
              private router:Router) { }

  ngOnInit() {
    this.userLogin=new LoginModel();
    if(localStorage.getItem('email')){
      this.userLogin.email=localStorage.getItem('email');
      this.remindMe=true;
    }
  }

  login(form:NgForm){
    if(form.invalid){return;}

    Swal.fire({
      allowOutsideClick:false,
      icon:'info',
      text:'Espere por favor'
    });
    Swal.showLoading();

    this.auth.login(this.userLogin).subscribe(resp=>{
      console.log(resp);
      Swal.close();
      if(this.remindMe){
        localStorage.setItem('email',this.userLogin.email);
      }
      this.router.navigateByUrl('/users');
    },(err)=>{
      console.log(err.error.error.message);
      Swal.fire({
        icon:'error',
        title:'Error al autenticar',
        text:err.error.error.message
      });
    });
  }
}
