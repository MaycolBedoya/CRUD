import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { UserModel } from 'src/app/models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users:UserModel[]=[];
  loading=false;

  constructor(private usersService:UsersService) { }

  ngOnInit() {
    this.loading=true;
    this.usersService.getUsers().subscribe(resp=>{
      this.users=resp;
      this.loading=false;
    });
  }

  deleteUser(user:UserModel, i:number){

    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${user.nombre}`,
      icon:'question',
      showConfirmButton:true,
      showCancelButton: true
    }).then(resp=>{
      if(resp.value){
        this.users.splice(i,1);
        this.usersService.deleteUser(user.id).subscribe();
      }
    });
  }
}
