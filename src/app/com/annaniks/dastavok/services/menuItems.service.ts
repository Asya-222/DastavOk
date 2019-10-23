import { Injectable } from '@angular/core';
import { MenuItem } from '../models/models';

@Injectable()
export class MenuItemsService {
    private _menuItems: Array<MenuItem> = [
        {
            label: "menu.dashboard",
            routerLink: "/dashboard",
            icon: "fas fa-file-invoice"
        },
        {
            label: "menu.statistic",
            routerLink: "/statistic",
            icon: "fas fa-chart-area"
        },
        {
            label: "menu.settings",
            routerLink: "/settings",
            icon: "fas fa-cogs"
        },
        {
            label: "menu.products",
            routerLink: "/products",
            icon: "fas fa-utensils",
        },
        {
            label: "menu.orders",
            routerLink: "/orders/start",
            icon: "fas fa-file-alt"
        },
        {
            label: "menu.accepted_orders",
            routerLink: "/orders/accepted",
            icon: "fas fa-list-alt"
        },
        {
            label: "menu.made_orders",
            routerLink: "/orders/maked",
            icon: "fas fa-cookie-bite"
        },
        {
            label: "menu.onway_orders",
            routerLink: "/orders/onway",
            icon: "fas fa-truck-moving"
        },
        {
            label: "menu.archive",
            routerLink: "/basket",
            icon: "fas fa-archive"
        }
    ]

    constructor() { }

    public getMenuItems():Array<MenuItem>{
       return this._menuItems;
    }

}