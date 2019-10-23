import {Injectable} from '@angular/core';
import { ServerRequests } from '../../../services';
import { ApiService } from '../../../services';
import { Observable } from 'rxjs';
import { MainService } from '../main.service';

@Injectable()
export class SettingsService{
    constructor(private _apiService: ApiService, private _mainService:MainService, private _serverRequestsService: ServerRequests){}

    public getProfileInfo():Observable<object>{
        return this._mainService.getProfileInfo();
    }
    public sendChangedData(body):Observable<object>{
        return this._apiService.put('company',body)
    }
     
    public createProfileImage(body): Observable<object>{
        return this._apiService.postFormData('company/image',body)
    }
    public editPassword(body): Observable<object>{
        return this._apiService.put('company/password',body)
    }
    public getAllTypesOfCompany(): Observable<object>{
        return this._apiService.get('company/typesAll')
    }
    public getTypes(){
        return this._apiService.get('company/types')
    }
    public sendNewTypes(body){
        return this._apiService.post('company/types',body)
    }
    public deleteTypeById(typeId){
        return this._apiService.delete(`company/types/${typeId}`)
    }
    public getTypesUnset(){
        return this._apiService.get('company/types/unused')
    }
    
}