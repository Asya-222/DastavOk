import {Injectable} from '@angular/core';
import { ApiService } from '../../../services';
import { Observable } from 'rxjs';

@Injectable()
export class ProductsService{

    constructor(private _apiService: ApiService){}

    // public getDishes():Observable<object>{
    //     return this._apiService.get('company/goods')
    // }
    public getDishById(id:number):Observable<any>{
        return this._apiService.get(`company/goods/${id}`)
    }
    public deleteDish(id:number):Observable<any>{
        return this._apiService.delete(`company/goods/${id}`)
    }
    public updateActiveOrNot(id:number,body:object):Observable<any>{
        return this._apiService.put(`company/goods/${id}/active`,body)
    }
    public updateHideOrNot(id:number,body:object):Observable<any>{
        return this._apiService.put(`company/goods/${id}/hide`,body)
    }
    public getToppingsOfDish(goodId:number):Observable<any>{
        return this._apiService.get(`company/topping/${goodId}`)
    }
    public editDatasOfDish(id:number,body:object):Observable<any>{
        return this._apiService.put(`company/goods/${id}`,body)
    }
    public addDishWithView(body:object):Observable<any>{
        return this._apiService.post(`company/topping`,body)
    }
    public deleteToppingWithView(toppingId:number):Observable<any>{
        return this._apiService.delete(`company/topping/${toppingId}`)
    }

    public putToppingWithView(toppingId:number,body:object):Observable<any>{
          return this._apiService.put(`company/topping/${toppingId}`,body)
    }
    public getInfoAboutOneInfoOfToppingWithGoodId(goodId:number,toppingId:number):Observable<any>{
        return this._apiService.get(`company/topping/${goodId}/${toppingId}`)

    }
    public getCountForShowDishes():Observable<any>{
        return this._apiService.get('company/goods/status/count/show')
        
    }
    public getDishesForShow(page:number,limit:number):Observable<any>{        
       return this._apiService.get(`company/goods/status/show/${page}/${limit}`)
    }
    public deleteProductImagesOfOne(id:number,image:string):Observable<any>{
        return this._apiService.delete(`company/goods/image/${id}/${image}`)
    }
    
}