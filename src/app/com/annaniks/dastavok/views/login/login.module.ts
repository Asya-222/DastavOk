import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginService } from "./login.service";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login/login.component";
import { SharedModule, MaterialModule } from "../../shared";
import { ApiService } from "../../services";
import { CookieService } from "angular2-cookie/services/cookies.service";
import { HttpClientModule } from '@angular/common/http';
import { ServerRequests } from "../../services/serverRequests.service";
import { LoadingComponent } from "../../components";


@NgModule({
    declarations:[LoginComponent],
    imports:[CommonModule,FormsModule,ReactiveFormsModule,LoginRoutingModule,SharedModule,HttpClientModule,MaterialModule],
    exports:[],
    providers:[LoginService,ApiService,CookieService,ServerRequests]
})
export class LoginModule {

}