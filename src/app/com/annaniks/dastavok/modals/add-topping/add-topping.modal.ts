import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProductsService } from '../../views/main/products/products.service';
import { ServerResponse, InfoOfOneToppingOfGood, ToppingItems, ItemsOfToppingOfOneProduct, DatasOfToppingsOfDish } from '../../models/models';
@Component({
    selector: 'add-topping',
    templateUrl: './add-topping.modal.html',
    styleUrls: ['./add-topping.modal.scss']
})
export class AddToppingModal implements OnInit {
    public addToppingForm: FormGroup;
    public errMessage: string = undefined;
    public infoOfToppingOfGood: InfoOfOneToppingOfGood;
    public loading: boolean = false;
    constructor(public dialogRef: MatDialogRef<AddToppingModal>,
        @Inject(MAT_DIALOG_DATA) public data: any, private _productsService: ProductsService) { }
    ngOnInit() {
        this._buildForm() 
        if (this.data.editable) {
            this.getOneToppingInfoOfGood()
        }
    }


    private _buildForm(): void {
        this.addToppingForm = new FormBuilder().group({
            name: ['', Validators.required],
            stepPrice: ['', Validators.required],
        })
    }


    public addTopping():void {
        let topping: ToppingItems = {
            name: this.addToppingForm.value.name,
            stepPrice: +this.addToppingForm.value.stepPrice
        }
        this.data.topping.push(topping);
        console.log(this.data);
        this.dialogRef.close(true);
    }

    public addToppingWithView():void {
        let toppingWithView: ItemsOfToppingOfOneProduct = {
            name: this.addToppingForm.value.name,
            stepPrice: +this.addToppingForm.value.stepPrice,
            goodId: this.data.dishId
        }
        this._productsService.addDishWithView(toppingWithView).subscribe((data: ServerResponse<DatasOfToppingsOfDish>) => {
            this.dialogRef.close(true)


        }, (err) => {
            console.log(err.error.message);
            this.loading = false;
            this.addToppingForm.enable();
            this.errMessage = err.error.message
        })

    }

    public editToppingWithView():void {
        let toppingForEdit: ToppingItems = {
            name: this.addToppingForm.value.name,
            stepPrice: +this.addToppingForm.value.stepPrice,
        }
        this._productsService.putToppingWithView(this.data.item, toppingForEdit).subscribe((data: ServerResponse<Array<any>>) => {
            this.dialogRef.close(true)
        }, (err) => {
            console.log(err.error.message);
            this.loading = false;
            this.addToppingForm.enable();
            this.errMessage = err.error.message
        })
    }
    public getOneToppingInfoOfGood():void {
        this._productsService.getInfoAboutOneInfoOfToppingWithGoodId(this.data.goodId, this.data.item).subscribe((data: ServerResponse<Array<InfoOfOneToppingOfGood>>) => {
            this.infoOfToppingOfGood = data.message[0]
            this._setToppingInfo()

        })
    }

    public add():void {
        this.loading = true;
        this.addToppingForm.disable();
        if (this.data.name === 'addToppingNew') {
            this.addTopping()
        } else if (this.data.name === 'addTopping') {
            this.addToppingWithView();
        } else if (this.data.name === 'editTopping') {

            this.editToppingWithView()

        }
    }

    private _setToppingInfo(): void {
        console.log(this.infoOfToppingOfGood);

        if (this.data.name === 'editTopping') {
            this.addToppingForm.patchValue({
                name: this.infoOfToppingOfGood.name,
                stepPrice: this.infoOfToppingOfGood.stepPrice
            })
        }

    }
}