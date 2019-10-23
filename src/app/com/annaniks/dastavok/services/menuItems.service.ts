import { Injectable } from '@angular/core';
import { MenuItem } from '../models/models';

@Injectable()
export class MenuItemsService {
    private _menuItems: Array<MenuItem> = [
        {
            label: "Доска",
            routerLink: "/dashboard",
            icon: "fas fa-file-invoice"
        },
        {
            label: "Статистика",
            routerLink: "/statistic",
            icon: "fas fa-chart-area"
        },
        {
            label: "Настройки",
            routerLink: "/settings",
            icon: "fas fa-cogs"
        },
        {
            label: "Продукты",
            routerLink: "/products",
            icon: "fas fa-utensils",
        },
        {
            label: "Заказы",
            routerLink: "/orders/start",
            icon: "fas fa-file-alt"
        },
        {
            label: "Принятые заказы",
            routerLink: "/orders/accepted",
            icon: "fas fa-list-alt"
        },
        {
            label: "Заказы в процессе",
            routerLink: "/orders/maked",
            icon: "fas fa-cookie-bite"
        },
        {
            label: "Заказы в пути",
            routerLink: "/orders/onway",
            icon: "fas fa-truck-moving"
        },
        {
            label: "Архив",
            routerLink: "/basket",
            icon: "fas fa-archive"
        }
    ]

    constructor() { }

    public getMenuItems():Array<MenuItem>{
       return this._menuItems;
    }

}