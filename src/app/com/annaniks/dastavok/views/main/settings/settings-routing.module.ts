import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";
import { SettingsComponent } from "./settings/settings.component";
const routesSettings: Routes = [
    {
        path:"",
        component: SettingsComponent
    }
]
@NgModule({
    imports:[RouterModule.forChild(routesSettings)],
    exports:[RouterModule]
})
export class SettingsRoutingModule{}