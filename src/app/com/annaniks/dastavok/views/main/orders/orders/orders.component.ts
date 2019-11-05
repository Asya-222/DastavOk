import {Component,OnInit} from '@angular/core';
import { MatDialog } from '@angular/material';

import { map } from 'rxjs/operators';
import { ServerResponse, OrdersData, StatusOfOrder, PaginatorPageNumber } from '../../../../models/models';
import { OrdersService } from '../orders.service';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { copyStyles } from '../../../../../../../../../node_modules/@angular/animations/browser/src/util';


@Component({
    selector: 'orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit{
    public loading: boolean = false;
    public messageForCheckOrdersList: string = undefined;
    public limit: number = 9;
    public countOfOrders: number = 0;
    public orderList : Array<object> = [];
    private _orderStatus: string;
    constructor(private _ordersService: OrdersService, private _activatedRoute: ActivatedRoute){
        this._checkOrderStatus()
    }
    ngOnInit(){}

   

    private _getOrders(pageName:string,page:number,limit:number){
        this.loading = true;
        return this._ordersService.getOrders(pageName,page,limit).subscribe(
            (data: ServerResponse<OrdersData>) => {
                console.log("orders",data)
                this.loading = false;
                if (data.message.count == 0){
                    this.messageForCheckOrdersList = "there_is_nothing_there"
                }else{
                    this.messageForCheckOrdersList = undefined
                }
                this.countOfOrders = data.message.count;
                this.orderList = data.message.result;
                console.log('order list',this.orderList);
            })
    }
    
    public paginate(event:PaginatorPageNumber){
        this._getOrders(this._orderStatus, event.pageNumber, this.limit);
    }

    private _checkOrderStatus():void{
        this._activatedRoute.params.subscribe((params: StatusOfOrder) => {
            this._resetProperties();
            this._orderStatus = params.orderStatus;
            this._getOrders(params.orderStatus, 1, this.limit);
        })
    }
    private _resetProperties(): void {
        this._orderStatus = undefined;
        this.orderList = [];
        this.countOfOrders = 0;
        this.limit = 9;
        this.messageForCheckOrdersList = undefined
    }
}