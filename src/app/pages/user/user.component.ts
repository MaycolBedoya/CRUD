import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { UserModel } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user = new UserModel();
  constructor(private userService: UsersService,
              private route:ActivatedRoute) { }

  ngOnInit() {
    const id= this.route.snapshot.paramMap.get('id');
    if(id!=='new'){
      this.userService.getUser(id).subscribe((resp:UserModel)=>{
        this.user=resp;
        this.user.id=id;
      });
    }
  }
  save(form: NgForm) {
    if (form.invalid) {
      console.log("formulario no válido");
      Swal.fire({
        title:'Error',
        text: 'No has ingresado la información solicitada',
        icon:'info',
        showConfirmButton:true,
        allowOutsideClick:false
      })
      return;
    }

    Swal.fire({
      title:'Espere',
      text: 'Guardando información',
      icon:'info',
      allowOutsideClick:false
    });
    Swal.showLoading();

    let request:Observable<any>;

    if (this.user.id) {
      request = this.userService.updateUser(this.user);
    } else {
      request= this.userService.createUser(this.user,'prueba');
    }
    request.subscribe(resp=>{
      Swal.fire({
        title:this.user.nombre,
        text:'Se actualizó correctamente',
        icon:'success'
      });
    })
  }
}
