import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { UsersComponent } from './pages/users/users.component';
import { UserComponent } from './pages/user/user.component';
import { DelayResolve } from './pages/observables/DelayResolve.observable';



const routes:Routes=[
  {path:'users', component:UsersComponent},
  {path:'user/:id', component:UserComponent},
  {path:'**',pathMatch:'full', redirectTo:'users'}
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
