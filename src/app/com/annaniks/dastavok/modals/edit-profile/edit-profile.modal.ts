import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SettingsService } from "../../views/main/settings/settings.service";
import { RegisterItems, ServerResponse, CompanyTypes } from "../../models/models";
import { AddTypeOfCompanyModal } from "../add-type-of-company/add-type-of-company.modal";
import { EditPasswordModal } from "../edit-password/edit-password.modal";
import { MessageService } from 'primeng/components/common/messageservice';

declare var google: any;

@Component({
    selector: 'edit-profile',
    templateUrl: 'edit-profile.modal.html',
    styleUrls: ['edit-profile.modal.scss']
})
export class EditProfileModal implements OnInit {
    public editProfileForm: FormGroup;
    public loading: boolean = false;
    public map;
    private sendingLat: number;
    private sendingLng: number;
    private markerlat: number;
    private markerlng: number;
    private marker;
    public allTypes: Array<CompanyTypes>;
    constructor(public dialogRef: MatDialogRef<EditProfileModal>,private _messagesService: MessageService,
        @Inject(MAT_DIALOG_DATA) public data: RegisterItems, private _settingsService: SettingsService, private dialog: MatDialog) { }

    ngOnInit() {
        this._buildForm();
        this._setProfileInfo();
        this._initMap();
        this.getAllTypes()

    }

    public onNoClick(): void {
        this.dialogRef.close();

    }
    private _buildForm(): void {
        this.editProfileForm = new FormBuilder().group({
            name: ['', Validators.required],
            username: ['', Validators.required],
            address: ['', Validators.required,],
            email: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
            code: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]



        })
    }
    private _setProfileInfo(): void {
        console.log("edit profile", this.data)
        if (this.data) {
            console.log(this.data);
            this.editProfileForm.patchValue({
                name: this.data.name,
                username: this.data.userName,
                address: this.data.address.text,
                email: this.data.email,
                code: this.data.zipCode

            })

        }
    }

    public sendDatas(): void {
        this.loading = true;
        this.editProfileForm.disable();
        if (this.markerlat == undefined && this.markerlng == undefined) {
            this.sendingLat = this.data.address.lat;
            this.sendingLng = this.data.address.lng;
        } else {
            this.sendingLat = this.markerlat;
            this.sendingLng = this.markerlng;
        }
        let sendingData: RegisterItems = {
            name: this.editProfileForm.value.name,
            userName: this.editProfileForm.value.username,
            address: {
                lat: this.sendingLat,
                lng: this.sendingLng,
                text: this.editProfileForm.value.address
            },
            email: this.editProfileForm.value.email,
            zipCode: this.editProfileForm.value.code

        }
        this._settingsService.sendChangedData(sendingData).subscribe((data: ServerResponse<Array<any>>) => {
            this.loading = false;
            this.editProfileForm.enable();
            this.dialogRef.close(true);
        })
    }


    private _initMap(corrdinates = { lat: 40.7865229, lng: 43.8476395 }, zoom = 15): void {
        var uluru = corrdinates
        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: zoom,
            center: uluru
        });
        this.marker = new google.maps.Marker({
            position: corrdinates,
            map: this.map
        });
        google.maps.event.addListener(this.map, 'click', (event) => {
            this.addMarker(event.latLng, this.map);
            this.markerlat = event.latLng.lat();
            this.markerlng = event.latLng.lng();
        });
    }


    private addMarker(location, map): void {
        if (this.marker && this.marker.setMap) {
            this.marker.setMap(null);
        }
        this.marker = new google.maps.Marker({
            position: location,
            map: map
        });
        map.setCenter(location);
        this.markerlat = location.lat();
        this.markerlng = location.lng();
        //this.getPlaceInfo(this.markerlat,this.markerlng);
        this.findNearRestaurants(this.markerlat, this.markerlng);
    }

    private findNearRestaurants(latitude, longitude): void {
        let service;
        let coordinates = new google.maps.LatLng(latitude, longitude);
        let request = {
            location: coordinates,
            radius: '100',
            types: ['restaurant', 'supermarket', 'store', 'food', 'storage', 'cafe', 'home_goods_store', "point_of_interest", "establishment", "grocery_or_supermarket"]
        };
        service = new google.maps.places.PlacesService(this.map);
        service.nearbySearch(request, (results, status) => {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                let address: string = '';
                let name: string = '';
                let zoom: number;
                address = results[0].name + ' ' + results[0].vicinity;
                name = results[0].name;
                this.markerlat = results[0].geometry.location.lat();
                this.markerlng = results[0].geometry.location.lng();
                let coordinates = { lat: this.markerlat, lng: this.markerlng };
                zoom = this.map.getZoom();
                this.editProfileForm.patchValue({
                    name: name,
                    address: address
                })
            }
        });
    }

    public getAllTypes(): void {
        this._settingsService.getAllTypesOfCompany().subscribe((data: ServerResponse<Array<CompanyTypes>>) => {
            this.allTypes = data.message
        })
    }
    public openAddTypeModal(): void {
        const addTypeDialogRef = this.dialog.open(AddTypeOfCompanyModal, {
            width: '300px',
            data: this.allTypes
        })
        addTypeDialogRef.afterClosed().subscribe(result => {        
            if (result) {
                this.getAllTypes()
            }
        });
    }
    public deleteType(id):void {
        this._settingsService.deleteTypeById(id).subscribe((data: ServerResponse<string>) => {
            console.log("deleted", data);
            this._messagesService.add({ severity: 'success', summary: '', detail: "Deleted" });
            this.getAllTypes()
        })
    }
    public editPassword(): void {
        const passwordDialogRef = this.dialog.open(EditPasswordModal, {
            width: '460px'

        })
    }
}