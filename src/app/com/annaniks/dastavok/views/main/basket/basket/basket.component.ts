import { Component, OnInit } from '@angular/core';
import { BasketService } from '../basket.service';
import { ServerResponse, PaginatorPageNumber, ProductInfo } from '../../../../models/models';
import { map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { ViewDetailsOfDishModal } from '../../../../modals';
import { MatDialog } from '@angular/material';
import { ProductsService } from '../../products/products.service';

@Component({
    selector: 'basket',
    templateUrl: './basket.component.html',
    styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
    public countOfHideDishes: number;
    public hideDishes: Array<object>;
    public loading: boolean = false;
    public limit: number = 10;
    public page: number = 1;
    constructor(private _basketService: BasketService, private dialog: MatDialog, private _productsService: ProductsService) { }
    ngOnInit() {
        this.getDishes()
    }
    public getDishes(): void {
        this.loading = true;
        forkJoin(
            this._getCountOfHideDishes(),
            this._getHideDishes()
        ).subscribe((data: Array<ServerResponse<any>>) => {
            this.loading = false
        });



    }

    private _getCountOfHideDishes(): Observable<ServerResponse<number>> {
        return this._basketService.getCountForHideDishes().pipe(
            map((data: ServerResponse<number>) => {
                console.log("tesninq vorn es", data.message);
                this.countOfHideDishes = data.message
                return data
            })
        )
    }

    private _getHideDishes(): Observable<ServerResponse<Array<Array<object>>>> {
        return this._basketService.getHideDishes(this.page, this.limit).pipe(
            map((data: ServerResponse<Array<Array<object>>>) => {
                console.log(data);
                this.hideDishes = data.message[0];

                console.log("hide dish ", this.hideDishes);

                return data
            })
        )
    }

    public paginate(event: PaginatorPageNumber): void {
        this.page = event.pageNumber;
        this.getDishes()
    }


    public seeDetailsOfDish(item: ProductInfo): void {
        const dialogRef = this.dialog.open(ViewDetailsOfDishModal, {
            width: '600px',
            height: '650px',
            data: {
                item: item,
                type: "basket"
            },
            panelClass: ["boxShadow"]
        })
    }
    public clickHide(item: ProductInfo): void {
        this.loading = true;
        this._productsService.updateHideOrNot(item.id, { isHide: (item.isHide) ? false : true }).subscribe((data: ServerResponse<Array<any>>) => {
            console.log("hide data", data);
            this.loading = false
            this.getDishes()
        })
    }

}
