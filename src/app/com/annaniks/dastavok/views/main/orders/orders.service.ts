import {Injectable} from '@angular/core';
import { ApiService } from '../../../services';
import { Observable } from 'rxjs';

@Injectable()
export class OrdersService{
    constructor( private _apiService: ApiService){

    }

    public getOrdersCount(pageName:string):Observable<any>{
        return this._apiService.get(`company/order/status/count/${pageName}`)
    }
    public getOrders(pageName:string,page:number,limit:number):Observable<any>{
        return this._apiService.get(`company/order/status/${pageName}/${page}/${limit}`)
    }
    public getOrder(orderId: string):Observable<any>{
        return this._apiService.get(`company/order/good/${orderId}`)
    }

  
}