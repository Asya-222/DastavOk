import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ForgotService } from "./forgot.service";
import { ForgotRoutingModule } from "./forgot-routing.module";
import { ForgotComponent } from "./forgot/forgot.component";
import { SharedModule, MaterialModule } from "../../shared";
import { ApiService } from "../../services";
import { CookieService } from "angular2-cookie/services/cookies.service";
import { HttpClientModule } from '@angular/common/http';
import { ServerRequests } from "../../services/serverRequests.service";
import { ForgotPasswordModal } from "../../modals";
import { ResetPasswordModal } from "../../modals/reset-password/reset-password.modal";


@NgModule({
    declarations:[ForgotComponent,ForgotPasswordModal,ResetPasswordModal],
    imports:[CommonModule,FormsModule,ReactiveFormsModule,ForgotRoutingModule,SharedModule,HttpClientModule,MaterialModule],
    exports:[],
    providers:[ForgotService,ApiService,CookieService,ServerRequests],
    entryComponents: [ForgotPasswordModal,ResetPasswordModal]
    
})
export class ForgotModule {

}