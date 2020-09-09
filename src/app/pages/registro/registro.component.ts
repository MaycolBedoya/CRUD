import { Component, OnInit } from '@angular/core';
import { LoginModel } from 'src/app/models/login.model';
import { NgForm } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserModel } from "src/app/models/user.model";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

userLogin: LoginModel;
user:UserModel;
remindMe=false;

  constructor(private auth:UsersService,
              private router:Router) { }

  ngOnInit() {
    this.userLogin=new LoginModel();
  }

  onSubmit(form:NgForm){
    if(form.invalid){return;}
    Swal.fire({
      allowOutsideClick:false,
      icon:'info',
      text:'Espere por favor'
    });
    Swal.showLoading();
    this.auth.newUser(this.userLogin).subscribe(resp=>{
      
      let temp:any=resp;
      console.log(temp.localId);
      this.user={email:this.userLogin.email,
      nombre:'',apellido:'',sexo:'',ciudad:'',direccion:'',telefono:0}
      this.auth.createUser(this.user, temp.localId);
      Swal.close();
      if(this.remindMe){
        localStorage.setItem('email',this.userLogin.email);
      }
      this.router.navigateByUrl('/login');
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
