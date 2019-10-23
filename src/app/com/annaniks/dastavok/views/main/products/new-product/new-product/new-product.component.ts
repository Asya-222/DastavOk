import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AddToppingModal } from '../../../../../modals';
import { NewProductService } from '../new-product.service';
import { AddNewDish, ServerResponse, DishTypes, NewDishData, Units } from '../../../../../models/models';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
@Component({
    selector: 'new-product',
    templateUrl: './new-product.component.html',
    styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
    public addProductForm: FormGroup;
    public localImage: string = "/assets/images/noFoto.jpg";
    public toppings: Array<object> = [];
    public dishTypes: Array<object>;
    public units: Array<object>;
    private _image: Event;
    public errorMessage: string = undefined;
    public _images: Array<Event> = [];
    public localImages: Array<string> = [];
    public _eachImage: Event;
    public readingImages: Array<object> = [];
    constructor(private router: Router, private dialog: MatDialog, private _newProductService: NewProductService) { }
    ngOnInit() {
        this._buildForm();
        this.getDishTypes();
    }

    private _buildForm(): void {
        this.addProductForm = new FormBuilder().group({
            chooseImg: ['', Validators.required],
            chooseImgs: [[], Validators.required],
            name: ['', Validators.required],
            price: ['', Validators.required],
            description: ['', Validators.required],
            dishTypeId: [[], Validators.required],
            readTime: ['', Validators.required],
            isDeal: [false]

        })
    }

    public cancel(): void {
        this.router.navigate(['/products'])
    }

    public forAddTopping(): void {
        const dialogRef = this.dialog.open(AddToppingModal, {
            width: '400px',
            data: {
                name: "addToppingNew",
                topping: this.toppings,
                editable: false
            }
        })
    }

    public addNewDish(): void {
        console.log(this.addProductForm.value.isDeal)
        let sendingData: AddNewDish = {
            name: this.addProductForm.value.name,
            price: +this.addProductForm.value.price,
            description: this.addProductForm.value.description,
            isDeal: this.addProductForm.value.isDeal,
            goodTypeId: +this.addProductForm.value.dishTypeId,
            readyTime: +this.addProductForm.value.readTime,
            toppings: this.toppings
        }
        this._newProductService.addDish(sendingData).subscribe((data: ServerResponse<NewDishData>) => {
            console.log(this._image)
            this._getImages(this._image, data.message.id, this.readingImages)
        },(err =>{
            this.errorMessage = "One of the fields entered incorrectly or not completed"
            
        }))

    }
    public getDishTypes(): void {
        this._newProductService.getDishTypes().subscribe((data: ServerResponse<Array<DishTypes>>) => {
            console.log(data)
            this.dishTypes = data.message
        })
    }


    photoUpload(event) {
        console.log(event);
        if (event) {
            let reader = new FileReader()
            this._image = event;
            reader.onload = (e: any) => {
                this.localImage = e.target.result;
            };
            reader.readAsDataURL(event.target.files[0]);

        }
    }

    multiTypeUpload(event) {
        console.log(event);
        this._images.push(event);
        let files = event.target.files;
        if (files) {
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
        }

    }


    private _uploadImages(events, id: number) {
        console.log(event);
        let formData = new FormData();
        for (let event of events) {
            formData.append('files', event.file, event.fileName);
        }
        return this._newProductService.addPhotosOfDish(formData, id).pipe(
            map((data: ServerResponse<string>) => {
                return data;
            }))
    }



    private _uploadImageProfile(event, id: number) {

        console.log("sdfsfdf", event, id)
        let formData = new FormData();
        if (event && event.target) {
            let fileList: FileList = event.target.files;
            if (fileList.length > 0) {
                let file: File = fileList[0];
                formData.append('file', file, file.name);


                return this._newProductService.addPhotoOfDish(formData, id).pipe(
                    map((data: any) => {
                        console.log("image response", data);
                        return data;
                    }))
            }
        }
    }
    private _getImages(image, id, readingImage): void {
        forkJoin(
            this._uploadImageProfile(image, id),
            this._uploadImages(readingImage, id)
        ).subscribe((data:Array<ServerResponse<string>>) => {
            this.router.navigate(['/products'])
        });

    }

    // private getDishDatas(id) {
    //     this._newProductService.getDishById(id).subscribe((data: any) => {
    //         console.log("norrrrrr", data)
    //     })
    // }

    public deleteChoosingPhoto(event): void {
        this.localImages.splice(event, 1)
    }

    public changedImage(event): void {
        console.log(event);
        this.readingImages[event.index] = event.file;
        this.localImages[event.index] = event.localImage
    }
}