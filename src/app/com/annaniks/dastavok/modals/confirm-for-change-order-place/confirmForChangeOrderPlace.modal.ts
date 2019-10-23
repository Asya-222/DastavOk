import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
    selector: 'confirm-for-change-order-place',
    templateUrl: './confirmForChangeOrderPlace.modal.html',
    styleUrls: ['./confirmForChangeOrderPlace.modal.scss']
})
export class ConfirmForChangeOrderPlaceModal implements OnInit {
    constructor(public dialogRef: MatDialogRef<ConfirmForChangeOrderPlaceModal>,
        @Inject(MAT_DIALOG_DATA) public data: any, ) { }
    ngOnInit() {
        console.log("confirm modal data",this.data)
     }

    public onClickYes(): void {
        this.dialogRef.close(true);
    }

    public onClickNo(): void {
        this.dialogRef.close(false)
    }
}
