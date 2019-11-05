import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductsService } from '../../views/main/products/products.service';
import { ServerResponse, DishData, DishTypes, Units, EdittingDatasOfDish } from '../../models/models';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NewProductService } from '../../views/main/products/new-product/new-product.service';

@Component({
    selector: 'settings-of-dish',
    templateUrl: './settings-of-dish.modal.html',
    styleUrls: ['./settings-of-dish.modal.scss']
})
export class SettingsOfDishModal implements OnInit {
    public editProductForm: FormGroup;
    public loading:boolean = false;
    public dishTypes: Array<object>;
    public units: Array<object>;
    constructor(public settingDialogRef: MatDialogRef<SettingsOfDishModal>,
        @Inject(MAT_DIALOG_DATA) public data: any, private _productService: ProductsService, private _newProductService: NewProductService) { }
    ngOnInit() {
        this._buildForm()
        this.getDishTypes();
        this.getProductData(this.data.id);
        this.seeOldInfoOfProduct()
    }


    public getProductData(id:number): void {
        this._productService.getDishById(id).subscribe((data: ServerResponse<DishData>) => {
            console.log('data', data)
        })
    }

    private _buildForm(): void {
        this.editProductForm = new FormBuilder().group({
            name: ['', Validators.required],
            price: ['', Validators.required],
            description: ['', Validators.required],
            dishTypeId: [[], Validators.required],
            readTime: ['', Validators.required],
            isDeal: [false],
            slider: [false]

        })
    }


    public getDishTypes(): void {
        this._newProductService.getDishTypes().subscribe((data: ServerResponse<Array<DishTypes>>) => {
            this.dishTypes = data.message
        })
    }
    

    public seeOldInfoOfProduct(): void {
        if (this.data) {
            console.log(this.data);
            this.editProductForm.patchValue({
                name: this.data.name,
                price: this.data.price,
                description: this.data.description,
                dishTypeId: this.data.goodTypeId,
                readTime: this.data.readyTime,
                isDeal :  this.data.isDeal,

            })

        }
    }

    public editDatasOfThisDish():void{
         this.loading = true;
        let sendingData: EdittingDatasOfDish = {
            name: this.editProductForm.value.name,
            price: +this.editProductForm.value.price,
            description: this.editProductForm.value.description,
            typesId: +this.editProductForm.value.dishTypeId,
            readyTime: +this.editProductForm.value.readTime,
            isDeal: this.editProductForm.value.isDeal,
            slider: this.editProductForm.value.slider
        }
        this._productService.editDatasOfDish(this.data.id,sendingData).subscribe((data:ServerResponse<Array<any>>) => {
            this.loading = false;
            this.settingDialogRef.close(true)
        })
    }
}