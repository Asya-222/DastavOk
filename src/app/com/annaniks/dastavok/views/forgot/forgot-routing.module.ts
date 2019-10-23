import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";
import { ForgotComponent } from "./forgot/forgot.component";
const routesForgot: Routes = [
    {
        path:"",
        component: ForgotComponent
    }
]
@NgModule({
    imports:[RouterModule.forChild(routesForgot)],
    exports:[RouterModule]
})
export class ForgotRoutingModule{}