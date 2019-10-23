import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";
import { RegistrationComponent } from "./registration/registration.component";
const routesRegistration: Routes = [
    {
        path:"",
        component: RegistrationComponent
    }
]
@NgModule({
    imports:[RouterModule.forChild(routesRegistration)],
    exports:[RouterModule]
})
export class RegistrationRoutingModule{}