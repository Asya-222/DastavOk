import {Injectable} from '@angular/core';
import { ApiService } from '../../../../services';
import { Observable } from 'rxjs';

@Injectable()
export class NewProductService{
    constructor(private _apiService : ApiService){}

    public addDish(body:object): Observable<object>{
        return this._apiService.post('company/goods',body)
    }
    public getDishTypes(): Observable<object>{
        return this._apiService.get('company/goodType')
    }
    public getUnits(): Observable<object>{
        return this._apiService.get('company/units')
    }
    public addPhotoOfDish(body,id:number):  Observable<object> {
        return this._apiService.postFormData(`company/goods/image/${id}`,body )
    }
    public getDishById(id:number):  Observable<object>{
        return this._apiService.get(`company/goods/${id}`)
    }
    public addPhotosOfDish(body,id:number):  Observable<object>{
        return this._apiService.postFormData(`company/goods/images/${id}`,body)
    }
}