import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'product-photos',
    templateUrl: '//product-photos.component.html',
    styleUrls: ['./product-photos.component.scss']
})
export class ProductPhotosComponent implements OnInit {
    @Input() item: string;
    @Input() index: number;
    @Output() deleteEvent = new EventEmitter();
    @Output() changeEvent = new EventEmitter();
    public locImage: string = "/assets/images/noFoto.jpg";
    constructor() { }
    ngOnInit() {
        
    }

    public deleteUploatedPhoto(): void {
        this.deleteEvent.emit(this.index);
    }

    public changedImage(file, localImage) {
        this.changeEvent.emit({ index: this.index, file: file, localImage: localImage })
    }

    photoUpload(event, ind) {
        if (event) {
            let reader = new FileReader()
            reader.onload = (e: any) => {
                this.locImage = e.target.result;
                let fileList: FileList = event.target.files;
                
                if (fileList.length > 0) {
                    let file: File = fileList[0];
                    
                    this.changedImage({ file: file, fileName: file.name }, this.locImage);
                }
            };
            reader.readAsDataURL(event.target.files[0]);




        }
    }




}