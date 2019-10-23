import {Injectable} from '@angular/core';
import { ServerRequests } from '../../services';
import { Observable } from 'rxjs';

@Injectable()
export class ForgotService{
    constructor(private _serverRequestsService: ServerRequests){}

    public postPhoneNumForResetPass(body:object):Observable<object | any>{
        return this._serverRequestsService.post('company/reset/password',body)
    }

    public postCodeForResetPass(body:object):Observable<object | any>{
        return this._serverRequestsService.post('company/token/password',body)
    }
     
    public putPassword(body:object):Observable<object | any>{
          return this._serverRequestsService.put('company/reset/password',body)
    }
}