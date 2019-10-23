import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SettingsService } from "./settings.service";
import { SettingsRoutingModule } from "./settings-routing.module";
import { SettingsComponent } from "./settings/settings.component";
import { SharedModule, MaterialModule } from "../../../shared";
import { ServerRequests } from "../../../services/serverRequests.service";
import { ApiService } from "../../../services";
import { EditProfileModal } from "../../../modals";
import { AddTypeOfCompanyModal } from "../../../modals/add-type-of-company/add-type-of-company.modal";
@NgModule({
    declarations:[SettingsComponent,EditProfileModal,AddTypeOfCompanyModal],
    imports:[CommonModule,FormsModule,ReactiveFormsModule,SettingsRoutingModule,MaterialModule,SharedModule],
    exports:[],
    entryComponents: [EditProfileModal,AddTypeOfCompanyModal],
    providers:[SettingsService,ApiService,ServerRequests]
})
export class SettingsModule{}