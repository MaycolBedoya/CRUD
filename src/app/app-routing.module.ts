import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { UsersComponent } from './pages/users/users.component';
import { UserComponent } from './pages/user/user.component';
import { RegistroComponent } from "./pages/registro/registro.component";
import { LoginComponent } from "./pages/login/login.component";
import { AuthGuard } from './guards/auth.guard';



const routes:Routes=[
  {path:'users', component:UsersComponent,canActivate:[AuthGuard]},
  {path:'user/:id', component:UserComponent, canActivate:[AuthGuard]},
  {path:'registro', component:RegistroComponent},
  {path:'login',component:LoginComponent},
  {path:'**',pathMatch:'full', redirectTo:'login'}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule {}
