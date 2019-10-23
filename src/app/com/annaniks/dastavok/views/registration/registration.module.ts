import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RegistrationService } from "./registration.service";
import { RegistrationRoutingModule } from "./registration-routing.module";
import { SharedModule, MaterialModule } from "../../shared";
import { RegistrationComponent } from "..";
import { ConfirmModal } from "../../modals/confirm/confirm.modal";
import { ApiService } from "../../services";
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from "angular2-cookie/services/cookies.service";
import { ServerRequests } from "../../services/serverRequests.service";
@NgModule({
    declarations:[RegistrationComponent,ConfirmModal],
    imports:[CommonModule,FormsModule,ReactiveFormsModule,RegistrationRoutingModule,SharedModule,MaterialModule,HttpClientModule],
    exports:[],
    providers:[RegistrationService,ApiService,CookieService,ServerRequests],
    entryComponents: [ConfirmModal]
})
export class RegistrationModule {

}