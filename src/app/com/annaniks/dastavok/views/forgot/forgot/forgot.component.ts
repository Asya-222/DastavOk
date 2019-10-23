import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ForgotService } from '../forgot.service';
import { PhoneNumForResetPass, ServerResponse } from '../../../models/models';
import { MatDialog } from '@angular/material';
import { ForgotPasswordModal } from '../../../modals';
@Component({
    selector: 'forgot',
    templateUrl: './forgot.component.html',
    styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
    public loading: boolean = false;
    public forgotForm: FormGroup;
    constructor(private _forgotService: ForgotService, private dialog: MatDialog) {

    }
    ngOnInit() {
        this._buildForm()
    }

    private _buildForm(): void {
        this.forgotForm = new FormBuilder().group({
            phoneNumForResetPass: ['', Validators.required],

        })
    }

    public sendPhoneNumForResetPass(): void {
        this.loading = true;
        this.forgotForm.disable();
        let sendingData: PhoneNumForResetPass = {
            phoneNumber: this.forgotForm.value.phoneNumForResetPass
        }
        this._forgotService.postPhoneNumForResetPass(sendingData).subscribe((data: ServerResponse<string>) => {
            this.loading = false;
            this.forgotForm.enable();
            this.openForgotPasswordModal()
        }, (err) => {
            this.loading = false;
            this.forgotForm.enable();
            console.log(err)
        })
    }
    public openForgotPasswordModal(): void {
        const dialogRef = this.dialog.open(ForgotPasswordModal, {
            width: '460px',
            data: this.forgotForm.value.phoneNumForResetPass
        })

    }

}