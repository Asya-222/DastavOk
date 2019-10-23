import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Router } from '@angular/router';
import { ServerResponse, TypeToken, LoginItems } from '../../../models/models';


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    public loading: boolean = false;
    public errorMessage: string = undefined;
    constructor(private _loginService: LoginService, private _cookieService: CookieService, private _router: Router) {

    }
    ngOnInit() {
        this._buildForm()
    }

    private _buildForm() {
        this.loginForm = new FormBuilder().group({
            username: ['restrant2018', Validators.required],
            password: ['restrant2018', Validators.required],

        })
    }
    public adminLogin(): void {
        this.loading = true;
        this.loginForm.disable();
        let sendingData: LoginItems = {
            Username: this.loginForm.value.username,
            Password: this.loginForm.value.password
        }
        this._loginService.login(sendingData).subscribe((data: ServerResponse<TypeToken>) => {
            this._cookieService.put("c_token", data.message.token);
            this._cookieService.put("c_refreshToken", data.message.refreshToken);
            this._router.navigate(["/dashboard"])
            this.loading = false;
            this.loginForm.enable();
        },(err)=> {
            this.loading = false;
            this.loginForm.enable();
            this.errorMessage = "Օne of the fields entered incorrectly, please try again"  
        })
    }

    
}