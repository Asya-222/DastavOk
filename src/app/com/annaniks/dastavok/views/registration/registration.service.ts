import {Injectable} from '@angular/core';
import { ApiService } from '../../services';
import { ServerRequests } from '../../services';
import { Observable } from 'rxjs';

@Injectable()
export class RegistrationService{

    constructor(private _serverRequestsService: ServerRequests){}

    public postDatas(body:object):Observable<object | any>{
        return this._serverRequestsService.post('company',body)
    }
    public confirmCodeForRegister(body:object):Observable<object | any>{
       return this._serverRequestsService.post('company/confirmed',body)
    }
    public getCompanyTypes():Observable<object | any>{
        return this._serverRequestsService.get('company/types')
    }

}