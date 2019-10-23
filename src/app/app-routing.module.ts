import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './com/annaniks/dastavok/services/authguard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: 'src/app/com/annaniks/dastavok/views/main/main.module#MainModule', canActivate: [AuthGuard]
  },
  {
    path: "login",
    loadChildren: "src/app/com/annaniks/dastavok/views/login/login.module#LoginModule"
  },
  // {
  //   path: "registration",
  //   loadChildren: "src/app/com/annaniks/dastavok/views/registration/registration.module#RegistrationModule"
  // },
  {
    path: "forgot",
    loadChildren: "src/app/com/annaniks/dastavok/views/forgot/forgot.module#ForgotModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
