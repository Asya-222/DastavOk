import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerResponse, TypeToken, LoginItems } from '../../../models/models';
import { CookieService } from 'ngx-cookie-service';

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
            username: ['Kilik', Validators.required],
            password: ['kilikia', Validators.required],

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
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 2);
            this._cookieService.set( 'c_token', data.message.token, expireDate);
            this._cookieService.set("c_refreshToken", data.message.refreshToken, expireDate);
            this._router.navigate(["/dashboard"])
            this.loading = false;
            this.loginForm.enable();
        },(err)=> {
            this.loading = false;
            this.loginForm.enable();
            this.errorMessage = "products.adding_product.input_field_incorrectly"  
        })
    }

    
}