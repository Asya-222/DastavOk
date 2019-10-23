import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DatePipe } from '@angular/common';
import { ProductsService } from '../../views/main/products/products.service';
import { ServerResponse, DatasOfToppingsOfDish, DishData } from '../../models/models';
import { AddToppingModal } from 'src/app/com/annaniks/dastavok/modals/add-topping/add-topping.modal';
import { MessageService } from 'primeng/components/common/messageservice';
import { SettingsService } from '../../views/main/settings/settings.service';
import { NewProductService } from 'src/app/com/annaniks/dastavok/views/main/products/new-product/new-product.service';

@Component({
    selector: 'view-details-of-dish',
    templateUrl: './view-details-of-dish.modal.html',
    styleUrls: ['./view-details-of-dish.modal.scss']
})
export class ViewDetailsOfDishModal implements OnInit {
    public imagesOfDish: Array<string> = [];
    public createdAt: string;
    public loading: boolean = false;
    public updatedAt: string;
    public localImages: Array<string> = [];
    public localImage: string = "";
    public readingImages: Array<object> = [];
    private _image: Event;
    public toppings: Array<object> = [];
    public toppingsOfThisDish: Array<DatasOfToppingsOfDish>
    constructor(@Inject('BASE_URL') public baseUrl, public dialogRef: MatDialogRef<ViewDetailsOfDishModal>,
        @Inject(MAT_DIALOG_DATA) public data: any, public datePipe: DatePipe, private _newProductsService: NewProductService, private _productsService: ProductsService, private dialog: MatDialog, private _messageService: MessageService) { }

    ngOnInit() {
        this.getImages();
        this.getDates();
        this.getToppingsOfThisDish()

    }

    public getImages(): void {
        if (this.data.item.images) {
            this.imagesOfDish = this.data.item.images.split(',')
        }
        if (this.data.item.thumbnail) {
            this.localImage = this.baseUrl + 'static/company/' + this.data.item.thumbnail
        }
    }
    public getOneDishById(): void {
        this._newProductsService.getDishById(this.data.item.id).subscribe((data: ServerResponse<DishData>) => {
            this.data.item = data.message;
            this.getImages();
        })
    }
    public getDates(): void {
        let createdTime = this.datePipe.transform(new Date(this.data.item.createdAt), 'dd-MM-yyyy');
        this.createdAt = createdTime;
        let updatedTime = this.datePipe.transform(new Date(this.data.item.updatedAt), 'dd-MM-yyyy');
        this.updatedAt = updatedTime
    }

    public getToppingsOfThisDish(): void {
        this._productsService.getToppingsOfDish(this.data.item.id).subscribe((data: ServerResponse<Array<DatasOfToppingsOfDish>>) => {
            this.toppingsOfThisDish = data.message

        })
    }

    public addTopping(): void {
        const dialogRef = this.dialog.open(AddToppingModal, {
            width: '400px',
            data: {
                name: "addTopping",
                dishId: this.data.item.id,
                topping: this.toppingsOfThisDish,
                editable: false
            }
        })
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.getToppingsOfThisDish()
            }
        })
    }

    public deleteTopping(id: number): void {
        this.loading = true;
        this._productsService.deleteToppingWithView(id).subscribe((data: ServerResponse<number>) => {
            this.loading = false
            this.getToppingsOfThisDish();
            this._messageService.add({ severity: 'success', summary: '', detail: "Deleted" })
        })
    }


    public editTopping(item) {
        const dialogRef = this.dialog.open(AddToppingModal, {
            width: '400px',
            data: {
                name: "editTopping",
                item: item,
                goodId: this.data.item.id,
                editable: true
            }
        })
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.getToppingsOfThisDish()
            }
        })
    }

    public photoUpload(event): void {
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

    private _uploadImageProfile(event): void {
        let formData = new FormData();
        if (event && event.target) {
            let fileList: FileList = event.target.files;
            if (fileList.length > 0) {
                let file: File = fileList[0];
                formData.append('file', file, file.name);
                this._newProductsService.addPhotoOfDish(formData, this.data.item.id).subscribe((data: ServerResponse<string>) => {
                    // this._getProfileInfo()
                    // this._messageService.add({ severity: 'success', summary: '', detail: data.message})
                })
            }
        }
    }

    public multiTypeUpload(event) :void  {
        let files = event.target.files;
        if (files) {
            this.readingImages = []
            for (let file of files) {
                let reader = new FileReader();
                reader.onload = (e: any) => {
                    this.localImages.push(e.target.result);
                }
                this.readingImages.push({
                    file: file,
                    fileName: file.name
                })
                reader.readAsDataURL(file);
            }
            this._uploadImages(this.readingImages, this.data.item.id)
        }


    }
    private _uploadImages(events, id:number):void{
        console.log(event);
        let formData = new FormData();
        for (let event of events) {
            formData.append('files', event.file, event.fileName);
        }
        this._newProductsService.addPhotosOfDish(formData, id).subscribe((data: ServerResponse<string>) => {
            this.getOneDishById()

        })
    }
    public deleteChoosingPhoto(ind:number):void {
        console.log(this.imagesOfDish[ind])
        this._productsService.deleteProductImagesOfOne(this.data.item.id, this.imagesOfDish[ind]).subscribe((data: ServerResponse<Array<Object>>) => {
        })
        this.imagesOfDish.splice(ind, 1)
        this._messageService.add({ severity: 'success', summary: '', detail: "Deleted" })
    }
}