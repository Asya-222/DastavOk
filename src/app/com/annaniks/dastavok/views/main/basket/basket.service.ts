import {Injectable} from '@angular/core';
import { ApiService } from '../../../services';
import { Observable } from 'rxjs';


@Injectable()
export class BasketService{
    constructor(private _apiService: ApiService){}

    public getCountForHideDishes():Observable<any>{
        return this._apiService.get('company/goods/status/count/hide')
        
    }
    public getHideDishes(page:number,limit:number): Observable<any>{        
       return this._apiService.get(`company/goods/status/hide/${page}/${limit}`)
    }
}