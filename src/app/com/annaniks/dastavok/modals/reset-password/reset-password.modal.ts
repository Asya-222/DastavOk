import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ForgotService } from "../../views/forgot/forgot.service";
import { ResetPassword } from "../../models/models";
import { MessageService } from 'primeng/components/common/messageservice';
@Component({
    selector: 'reset-password',
    templateUrl: './reset-password.modal.html',
    styleUrls: ['./reset-password.modal.scss']
})
export class ResetPasswordModal implements OnInit {
    public resetPassForm: FormGroup;
    public loading: boolean = false;
    public matchingPasswordsError: string = undefined
    constructor(public passDialogRef: MatDialogRef<ResetPasswordModal>,
        @Inject(MAT_DIALOG_DATA) public data: any, private _forgotService: ForgotService, private _messagesService: MessageService) {

    }
    ngOnInit() {
        this._buildForm()
    }

    private _buildForm(): void {
        this.resetPassForm = new FormBuilder().group({
            password: ['', Validators.required],
            repeatPassword: ['', Validators.required]

        }, { validator: this.matchingPasswords('password', 'repeatPassword') })
        this.resetPassForm.valueChanges.subscribe((data) => {
            if (this.resetPassForm.value.password != this.resetPassForm.value.repeatPassword && this.resetPassForm.get("password").dirty && this.resetPassForm.get("repeatPassword").dirty) {
                this.matchingPasswordsError = "Пароли не совпадают"
            } else {
                this.matchingPasswordsError = undefined
            }
        })
    }

    private matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
        return (group: FormGroup): { [key: string]: any } => {
            let password = group.controls[passwordKey];
            let confirmPassword = group.controls[confirmPasswordKey];
            if (password.value !== confirmPassword.value) {
                return {
                    mismatchedPasswords: true
                };
            }
        }
    }


    public sendPassword(): void {
        this.loading = true;
        this.resetPassForm.disable();
        console.log(this.data)
        let sendingData: ResetPassword = {
            token: this.data.token,
            password: this.resetPassForm.value.password
        }
        this._forgotService.putPassword(sendingData).subscribe((data: any) => {
            this.loading = false;
            this.resetPassForm.enable();
            this._messagesService.add({ severity: 'success', summary: '', detail: data.message });
            this.passDialogRef.close(true)
        })
    }
}