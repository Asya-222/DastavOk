import {Component,OnInit, Input, Inject} from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from '../../../views/main/orders/orders.service';
import { MainService } from '../../../views/main/main.service';
import { OneOrder } from '../../../models/models';

@Component({
    selector: 'orders-list-item',
    templateUrl: './orders-list-item.component.html',
    styleUrls: ['./orders-list-item.component.scss']
})
export class OrdersListItemComponent implements OnInit{
    @Input() public infoAboutOrder: OneOrder;
   
    constructor(@Inject('BASE_URL') public baseUrl,private _router: Router){}

    ngOnInit(){}


    public onClickMore(): void {
        this._navigateToOrderDetails(this.infoAboutOrder.id);
    }

    private _navigateToOrderDetails(id:number): void {
        let status:string = this.infoAboutOrder.status;
        debugger;
        if (status === 'start' || status === 'accepted' || status === 'on-way' || status === 'maked' || status === 'completed') {
            this._router.navigate([`/orders/${status}/${id}`])
        }
        console.log(status);
        
    }

    
}