import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
const routesLogin: Routes = [
    {
        path:"",
        component: LoginComponent
    }
]
@NgModule({
    imports:[RouterModule.forChild(routesLogin)],
    exports:[RouterModule]
})
export class LoginRoutingModule{}