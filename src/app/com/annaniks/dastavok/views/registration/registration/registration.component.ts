import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ConfirmModal } from '../../../modals';
import { RegistrationService } from '../registration.service';
import { ServerResponse, TypeCompany, RegisterItems, Err, AddressForShowOrder } from '../../../models/models';

declare var google: any;

@Component({
    selector: 'registration',
    templateUrl: './registration.component.html',
    styleUrls: ['registration.component.scss']
})
export class RegistrationComponent implements OnInit {
    public regForm: FormGroup;
    public toppingList: Array<string> = [];
    public companyTypes:TypeCompany;
    public loading: boolean = false;
    public errorMessage: string = undefined;
    public companies: Array<string>;
    private _emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    public map;
    private _markerlat: number;
    private _markerlng: number;
    private _marker;

    constructor(private dialog: MatDialog, private _registrationService: RegistrationService) { }
    ngOnInit() {
        this._buildForm();
        this._initMap();
        this._getCompanyTypes();
        // this.confirmDialog()
    }

    private _buildForm():void {
        this.regForm = new FormBuilder().group({
            name: ['', Validators.required],
            username: ['', Validators.required],
            address: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern(this._emailPattern),]],
            phoneNum: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
            zipCode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
            types: [[], Validators.required],
            compType: ['', Validators.required]

        })
    }
    public confirmDialog(): void {
        const dialogRef = this.dialog.open(ConfirmModal, {
            width: '460px',
            data: {
                phoneNumber: this.regForm.value.phoneNum
            }

        })

    }

    public sendDatasForRegister(): void {
        this.loading = true;
        this.regForm.disable();
        let sendingData: RegisterItems = {
            name: this.regForm.value.name,
            userName: this.regForm.value.username,
            address: {
                lat: this._markerlat,
                lng: this._markerlng,
                text: this.regForm.value.address
            },
            email: this.regForm.value.email,
            phoneNumber: this.regForm.value.phoneNum,
            password: this.regForm.value.password,
            zipCode: +this.regForm.value.zipCode,
            types: this.regForm.value.types,
            companyType: this.regForm.value.compType,
        }
        this._registrationService.postDatas(sendingData).subscribe((data: RegisterItems) => {
            console.log(data);
            this.loading = false;
            this.regForm.enable();
            this.confirmDialog()
            this.errorMessage = undefined;
        }, (err: Err) => {
            this.loading = false;
            this.regForm.enable();
            this.errorMessage = err.error.message
            console.log(err.error.message)
        }, )
    }

    private _getCompanyTypes(): void {
        this._registrationService.getCompanyTypes().subscribe((data: ServerResponse<TypeCompany>) => {
            this.companyTypes = data.message;
        })
    }

    private _initMap(corrdinates:AddressForShowOrder = { lat: 40.7865229, lng: 43.8476395 }, zoom = 15):void {
        var uluru : AddressForShowOrder = corrdinates
        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: zoom,
            center: uluru
        });
        this._marker = new google.maps.Marker({
            position: corrdinates,
            map: this.map
        });
        google.maps.event.addListener(this.map, 'click', (event) => {
            this._addMarker(event.latLng, this.map);
            this._markerlat = event.latLng.lat();
            this._markerlng = event.latLng.lng();
        });
    }


    private _addMarker(location, map):void {
        if (this._marker && this._marker.setMap) {
            this._marker.setMap(null);
        }
        this._marker = new google.maps.Marker({
            position: location,
            map: map
        });
        map.setCenter(location);
        this._markerlat = location.lat();
        this._markerlng = location.lng();
        //this.getPlaceInfo(this.markerlat,this.markerlng);
        this._findNearRestaurants(this._markerlat, this._markerlng);
    }

    private _findNearRestaurants(latitude:number, longitude:number):void{
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
                this._markerlat = results[0].geometry.location.lat();
                this._markerlng = results[0].geometry.location.lng();
                let coordinates = { lat: this._markerlat, lng: this._markerlng };
                zoom = this.map.getZoom();
                this.regForm.patchValue({
                    name: name,
                    address: address
                })
            }
        });


    }
}