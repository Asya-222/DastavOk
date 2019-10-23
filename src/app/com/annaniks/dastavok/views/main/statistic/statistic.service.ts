import { Injectable } from '@angular/core';
import { ApiService } from '../../../services';
import { Observable } from 'rxjs';

@Injectable()
export class StatisticService {
    constructor(private _apiService: ApiService) {}

    public getStatistics(date:Date,lengthCount:number,type:string):Observable<object | any>{
        return this._apiService.get(`company/statistics/${date}/${lengthCount}/${type}`)
    }
}
