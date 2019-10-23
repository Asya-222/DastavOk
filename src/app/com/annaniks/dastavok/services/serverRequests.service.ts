import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class ServerRequests {
    constructor(@Inject('BASE_URL') private baseUrl,private _httpClient: HttpClient) { }
    

    public get(url: string): Observable<object | any> {
        return this._httpClient.get(this.baseUrl + url)
    }
    public post(url: string, body: object): Observable<object | any> {
        return this._httpClient.post(this.baseUrl + url, body)
    }
    public put(url: string, body: object): Observable<object | any> {
        return this._httpClient.put(this.baseUrl + url, body)
    }

    public delete(url: string): Observable<object | any> {
        return this._httpClient.delete(this.baseUrl + url)
    }
}