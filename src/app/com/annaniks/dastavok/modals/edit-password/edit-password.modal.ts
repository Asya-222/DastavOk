import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SettingsService } from '../../views/main/settings/settings.service';
import { ForChangePassword, ServerResponse } from '../../models/models';
import { MessageService } from 'primeng/components/common/messageservice';
@Component({
    selector: 'edit-password',
    templateUrl: './edit-password.modal.html',
    styleUrls: ['./edit-password.modal.scss']
})
export class EditPasswordModal implements OnInit {
    public editPasswordForm: FormGroup;
    public loading: boolean = false;
    public _matchingPasswordsError: string = undefined
    constructor(public passwordDialogRef: MatDialogRef<EditPasswordModal>,
        @Inject(MAT_DIALOG_DATA) public data: any, private _settingsService: SettingsService, private _messagesService: MessageService) {

    }
    ngOnInit() {
        this._buildForm()
    }

    private _buildForm(): void {
        this.editPasswordForm = new FormBuilder().group({
            oldPassword: ['', Validators.required],
            newPassword: ['', Validators.required],
            repeatPassword: ['', Validators.required]

        }, { validator: this.matchingPasswords('newPassword', 'repeatPassword') })
        this.editPasswordForm.valueChanges.subscribe((data) => {
            if (this.editPasswordForm.value.newPassword != this.editPasswordForm.value.repeatPassword && this.editPasswordForm.get("newPassword").dirty && this.editPasswordForm.get("repeatPassword").dirty) {
                this._matchingPasswordsError = "Пароли не совпадают"
            } else {
                this._matchingPasswordsError = undefined
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


    public editPassword(): void {
        this.loading = true;
        this.editPasswordForm.disable();
        let sendingData: ForChangePassword = {
            password: this.editPasswordForm.value.newPassword,
            oldPassword: this.editPasswordForm.value.oldPassword
        }
        this._settingsService.editPassword(sendingData).subscribe((data: ServerResponse<Array<object>>) => {
            this.loading = false;
            this.editPasswordForm.enable();
            console.log("change password", data);
            this.passwordDialogRef.close(true);
            this._messagesService.add({ severity: 'success', summary: '', detail: "Пароль изменен" });
        }, err => {
            this.loading = false;
            this.editPasswordForm.enable();
            this._messagesService.add({ severity: 'error', summary: '', detail: "Проверьте правильность введенных данных и попробуйте еще раз!" });
        })
    }

}