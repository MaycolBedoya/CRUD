import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { map, delay } from "rxjs/operators";
import { LoginModel } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private urllogin = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey ='AIzaSyA09iqYgZ8Q3TczoYJ7aL6HNQ13JFonJL0';
  userToken: string;
  //crear users
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //autenticar
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
  private url='https://crud-app-e20c4.firebaseio.com/';

  constructor(private http: HttpClient) {
    this.readToken();
   }

  logout(){
    localStorage.removeItem('token');
  }

  login(user:LoginModel){
    const authData={
      ...user,
      returnSecureToken:true
    };
    return this.http.post(
      `${this.urllogin}signInWithPassword?key=${this.apikey}`,
      authData
      ).pipe(
        map(resp=>{
          this.saveToken(resp['idToken']);
          return resp;
        })
      );
  }

  newUser(user:LoginModel){
    const authData={
      //...user,
      email:user.email,
      password:user.password,
      returnSecureToken:true
    };
    return this.http.post(
      `${this.urllogin}signUp?key=${this.apikey}`,
      authData
      ).pipe(
        map(resp=>{
          this.saveToken(resp['idToken']);
          return resp;
        })
      );
  }
  
  private saveToken(idToken:string){
    this.userToken=idToken;
    localStorage.setItem('token',idToken);

    let today=new Date();
    today.setSeconds(3600);

    localStorage.setItem('expire',today.getTime().toString())
  }

  readToken(){
    if(localStorage.getItem('token')){
      this.userToken=localStorage.getItem('token');
    }else{
      this.userToken='';
    }
    return this.userToken;
  }

  isAuthenticated(): boolean{

    if(this.userToken.length<2){
      return false;
    }

    const expire= Number(localStorage.getItem('expire'));
    const expireDate= new Date();
    expireDate.setTime(expire);
    
    if(expireDate>new Date()){
      return true;
    }else{
      return false;
    }
  }

  createUser(user:UserModel, uid:string){
    //console.log(user,uid);
    return this.http.post(`${this.url}/users.json`,user)
    .pipe(
      map((resp:any)=>{
        user.id=uid;
        console.log(user,uid);
        return user;
      })
    );
  }
  updateUser(user:UserModel){

    const userTemp={
      ...user
    };
    delete userTemp.id;

    return this.http.put(`${this.url}/users/${user.id}.json`,userTemp);
  }

  deleteUser(id:string){
    return this.http.delete(`${this.url}/users/${id}.json`);
  }
  
  getUser(id:string){
    return this.http.get(`${this.url}/users/${id}.json`);
  }

  getUsers(){
    return this.http.get(`${this.url}/users.json`)
    .pipe(
      map(this.createArray),
      delay(1000)
    );
  }

  private createArray(usersObj:object){
    const users:UserModel[]=[];
    if(usersObj=== null){return [];}
    Object.keys(usersObj).forEach(key=>{
      const user:UserModel=usersObj[key];
      user.id=key;

      users.push(user);
    });
    return users;
  }
}


