import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ForgotService } from '../../views/forgot/forgot.service';
import { CodeForResetPass, ServerResponse, NewToken } from '../../models/models';
import { ResetPasswordModal } from '../reset-password/reset-password.modal';

@Component({
    selector: 'forgot-password',
    templateUrl: './forgot-password.modal.html',
    styleUrls: ['./forgot-password.modal.scss']
})
export class ForgotPasswordModal implements OnInit {
    public sendCodeForResetPassForm: FormGroup;
    private newToken: string;
    public loading : boolean = false;
    constructor(public dialogRef: MatDialogRef<ForgotPasswordModal>,
        @Inject(MAT_DIALOG_DATA) public data: any,private _forgotService: ForgotService,private _dialog: MatDialog) {

    }
    ngOnInit() {
        this._buildForm()
    }

    private _buildForm(): void {
        this.sendCodeForResetPassForm = new FormBuilder().group({
            code: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(4)]],

        })
    }
   public sendCodeForResetPass(){
       this.loading = true;
       this.sendCodeForResetPassForm.disable()
       let sendingData:CodeForResetPass = {
           code: +this.sendCodeForResetPassForm.value.code,
           phoneNumber: this.data
       }
       this._forgotService.postCodeForResetPass(sendingData).subscribe((data:ServerResponse<NewToken>)=> {
        this.loading = false;
        this.sendCodeForResetPassForm.enable()
           console.log("after enter code",data);
           this.newToken = data.message.token;
           this.dialogRef.close(true);   
           this.openResetPasswordModal()
       },(err) => {
        this.loading = false;
        this.sendCodeForResetPassForm.enable()
       })
   }
   public openResetPasswordModal():void {
    const passDialogRef = this._dialog.open(ResetPasswordModal, {
        width: '460px',
        data:{
            token: this.newToken
        } 
        

    })

}


}