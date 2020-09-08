import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth:UsersService,
              private router:Router){}

  canActivate():boolean {
    if(this.auth.isAuthenticated()){
      return true;
    }else{
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
