import {Injectable} from '@angular/core';
import { ApiService } from '../../../services';
import { Observable } from 'rxjs';

@Injectable()
export class DashboardService{
  
    constructor(private _apiService: ApiService){}

    public getDashboardInfo():Observable<any>{
        return this._apiService.get('company/dashboard')
    }
}