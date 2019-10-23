import {Injectable} from '@angular/core';
import { ApiService } from '../../../../services';
import { Observable } from 'rxjs';

@Injectable()
export class PageOfOrderService{
    constructor(private _apiService: ApiService){}
    
    public changeOrders(pageName: string, orderId: string, body = {}):Observable<any>{
        return this._apiService.put(`company/order/status/${pageName}/${orderId}`, body);
    }
}