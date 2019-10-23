import { Component, OnInit } from '@angular/core';
import { MenuItemsService } from '../../services';
import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';
import { MainService } from '../../views/main/main.service';

@Component({
    selector: 'menu',
    templateUrl: 'menu.component.html',
    styleUrls: ['menu.component.scss']
})
export class MenuComponent implements OnInit {

    constructor(public menuItemsService: MenuItemsService, private _cookieService: CookieService, private _router: Router, public mainService: MainService) { }

    ngOnInit() { 
        this.getProfileInfo();
    }

    logOut() {
        this._cookieService.remove("c_refreshToken");
        this._cookieService.remove("c_token")
        this._router.navigate(["login"])
    }

    public getProfileInfo(): void {
        this.mainService.getProfileInfo().subscribe();
    }





}