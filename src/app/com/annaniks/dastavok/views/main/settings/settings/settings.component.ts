import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { SettingsService } from '../settings.service';
import { ProfileInfo, ServerResponse } from '../../../../models/models';
import { MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EditProfileModal } from '../../../../modals';
import { MessageService } from 'primeng/components/common/messageservice';
@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    public panelOpenState: boolean = false;
    public profileInfo: ProfileInfo;
    public loading: boolean = false;
    public lding: boolean = false
    public editPasswordForm: FormGroup;
    public localImage: string = "/assets/images/default.png";
    private _image: Event;


    constructor(@Inject('BASE_URL') private _baseUrl, private _settingsService: SettingsService, private dialog: MatDialog, private _messageService: MessageService) { }
    ngOnInit() {
        this._getProfileInfo();
    }

    private _getProfileInfo(): void {
        this.loading = true;
        this._settingsService.getProfileInfo().subscribe((data: ServerResponse<ProfileInfo>) => {
            this.profileInfo = data.message
            console.log(this.profileInfo.image)
            this.localImage = data.message.image;
            this.loading = false;


        })
    }

    public editProfile(): void {
        const dialogRef = this.dialog.open(EditProfileModal, {
            width: '550px',
            maxHeight: "80vh",
            data: this.profileInfo,
            panelClass: 'modalOfEditingProfile'
        })
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._getProfileInfo();
            }
        })
    }





    photoUpload(event) {

        if (event) {
            let reader = new FileReader();
            this._image = event
            reader.onload = (e: any) => {
                this.localImage = e.target.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        }
        this._uploadImageProfile(this._image);
    }

    private _uploadImageProfile(event) {

        console.log("sdfsfdf", event)
        let formData = new FormData();
        if (event && event.target) {
            let fileList: FileList = event.target.files;
            if (fileList.length > 0) {
                let file: File = fileList[0];
                formData.append('file', file, file.name);

                this.loading = true;
                this._settingsService.createProfileImage(formData).subscribe((data: ServerResponse<string>) => {
                    console.log("image of profile", data);
                    this.loading = false
                    this._messageService.add({ severity: 'success', summary: '', detail: data.message })
                    this._getProfileInfo();
                })
            }
        }
    }





}