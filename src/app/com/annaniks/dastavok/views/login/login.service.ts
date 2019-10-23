import { Injectable } from '@angular/core';
import { ServerRequests } from '../../services';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {
    constructor(private _serverRequestsService: ServerRequests) { }

    public login(body:object):Observable<object | any>{
        return this._serverRequestsService.post('company/login', body)
    }
}