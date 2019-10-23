import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

import { SettingsService } from "../../views/main/settings/settings.service";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SendNewType, ServerResponse, CompanyTypes, TypeOfCompany, AddTypesOfCompanyModal } from "../../models/models";
@Component({
    selector: 'add-type-of-company',
    templateUrl: './add-type-of-company.modal.html',
    styleUrls: ['./add-type-of-company.modal.scss']

})
export class AddTypeOfCompanyModal implements OnInit {
    private  _typesForm: FormGroup;
    public restTypes: Array<number>;
    public typesList: Array<TypeOfCompany>;
    constructor(public addTypeDialogRef: MatDialogRef<AddTypeOfCompanyModal>,
        @Inject(MAT_DIALOG_DATA) public data: Array<AddTypesOfCompanyModal>, private _settingsService: SettingsService) { }
    
    ngOnInit() {
        this._buildForm()
        this._getTypes()
    }

    private _getTypes(): void {
        this._settingsService.getTypesUnset().subscribe((data: ServerResponse<Array<TypeOfCompany>>) => {
            this.typesList = data.message;
        })
    }
    private _buildForm(): void {
        this._typesForm = new FormBuilder().group({
            types: [[], Validators.required],
        })
    }

    public saveType():void {
        let sendingData: SendNewType = {
            typesId: this._typesForm.value.types
        }
        this._settingsService.sendNewTypes(sendingData).subscribe((data: ServerResponse<string>) => {
            this.addTypeDialogRef.close(true);
        })
    }

    get typesForm():FormGroup{
      return this._typesForm
    }
}