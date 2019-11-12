import { Component, OnInit } from '@angular/core';
import { PeriodicElement, ServerResponse, PaginatorPageNumber, ProductInfo } from '../../../../models/models';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { ViewDetailsOfDishModal } from '../../../../modals';
import { SettingsOfDishModal } from '../../../../modals/settings-of-dish/settings-of-dish.modal';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessageService } from 'primeng/components/common/messageservice';


@Component({
    selector: 'products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
    public loading: boolean = false;
    public datasOfDish: Array<object>;
    public countOfDishesForShow: number;
    public showDishes: Array<object>;
    public limit: number = 10;
    public page: number = 1;
    public checkCountOfProducts: string = undefined;
    private _errorMessageForDeleteDish: string = "";
    constructor(private dialog: MatDialog, private router: Router, private _productsService: ProductsService, private _messagesService: MessageService) { }
    ngOnInit() {
        this.getDishes()
    }


    public addProduct(): void {
        this.router.navigate(['/products/new'])
    }


    public getDishes(): void {
        this.loading = true;
        forkJoin(
            this._getCountOfDishesForShow(),
            this._getDishesForShow()
        ).subscribe((data: Array<ServerResponse<any>>) => {
            this.loading = false
        });

    }

    private _getCountOfDishesForShow(): Observable<any> {
        return this._productsService.getCountForShowDishes().pipe(
            map((data: ServerResponse<number>) => {
                this.countOfDishesForShow = data.message;
                if(data.message == 0){
                    this.checkCountOfProducts = "there_is_nothing_there"
                }else{
                    this.checkCountOfProducts = undefined
                }
                return data
            })
        )
    }

    private _getDishesForShow(): Observable<any> {
        return this._productsService.getDishesForShow(this.page, this.limit).pipe(
            map((data: ServerResponse<Array<Array<object>>>) => {
                this.showDishes = data.message;
                console.log(this.showDishes)
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
            data: {
                item: item,
                type: "product"
            },
            panelClass: ['styleOfBasketModal','modalOfEditingProfile']
        })
        dialogRef.afterClosed().subscribe((result) => {
            this.getDishes()
        })
    }
    public editDatasOfTheDish(item: ProductInfo): void {
        const settingsDialogRef = this.dialog.open(SettingsOfDishModal, {
            width: '500px',
            data: item
        })
        settingsDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.getDishes()
            }
        })
    }
    public deleteDish(id: number): void {
        this._productsService.deleteDish(id).subscribe((data: ServerResponse<number>) => {
            this.getDishes();
            this._messagesService.add({ severity: 'success', summary: '', detail: "Удалён" })
        }, (err) => {
            if (err.error.data.message == "Permission denied") {
                this._errorMessageForDeleteDish = "Вы не можете удалить это";
            }
            this._messagesService.add({ severity: 'error', summary: '', detail: this._errorMessageForDeleteDish })

        })
    }


    public clickToggle(item:ProductInfo): void {
        this._productsService.updateActiveOrNot(item.id, { isActive: (item.isActive) ? false : true })
            .subscribe((data:ServerResponse<Array<any>>) => {
                this.getDishes()
            })
    }

    public clickHide(item:ProductInfo): void {
        this.loading = true;
        this._productsService.updateHideOrNot(item.id, { isHide: (item.isHide) ? false : true }).subscribe((data: ServerResponse<Array<any>>) => {
            this.loading = false
            this.getDishes()
        })
    }


}