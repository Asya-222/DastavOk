import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RegisterItems, ServerResponse, TypeToken } from '../../models/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistrationService } from '../../views/registration/registration.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Router } from '@angular/router';

@Component({
    selector: 'confirm',
    templateUrl: './confirm.modal.html',
    styleUrls: ['./confirm.modal.scss']
})
export class ConfirmModal implements OnInit {
    public loading: boolean = false;
    public confirmForm: FormGroup;
    constructor(public dialogRef: MatDialogRef<ConfirmModal>,
        @Inject(MAT_DIALOG_DATA) public data: any, private _registrationService: RegistrationService, private _cookieService: CookieService, private _router: Router) { }
    ngOnInit() {
        this._buildForm()
        
        
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    private _buildForm():void {
        this.confirmForm = new FormBuilder().group({
            code: ['', Validators.required],
        })
    }

    onConfirmClick():void{
        this.loading = true;
        this.confirmForm.disable();
        this._registrationService.confirmCodeForRegister({
            code: +this.confirmForm.value.code,
            phoneNumber: this.data.phoneNumber
        }).subscribe((data: ServerResponse<TypeToken>) => {
            this.loading = false;
            this.confirmForm.enable();
            this._cookieService.put("c_token", data.message.token);
            this._cookieService.put("c_refreshToken", data.message.refreshToken);
            this._router.navigate(["/dashboard"])
            this.dialogRef.close();
        }, (err) => {
            this.loading = false;
            this.confirmForm.enable();
        })
    }
}