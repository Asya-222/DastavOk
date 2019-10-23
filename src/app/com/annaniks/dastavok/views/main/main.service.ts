import {Injectable, Inject} from '@angular/core';
import { ApiService } from '../../services';
import { map } from 'rxjs/operators';
import { ServerResponse, RestaurantProfileInfo } from '../../models/models';


@Injectable()
export class MainService{
    private _userInfo:RestaurantProfileInfo;
    constructor(@Inject('BASE_URL') private _baseUrl:string,private _apiService: ApiService){}

    public getProfileInfo(){
        return this._apiService.get('company').pipe(
            map((data: ServerResponse<RestaurantProfileInfo>)=>{
                if(!data.message.image){
                    data.message.image = '/assets/images/noFoto.jpg';
                }
                else{
                    data.message.image=`${this._baseUrl}static/company/${data.message.image}`
                }
                this._userInfo = data.message;
                return data;
            })
        )
    }

    public getUserInfo(){
        return this._userInfo;
    }
}