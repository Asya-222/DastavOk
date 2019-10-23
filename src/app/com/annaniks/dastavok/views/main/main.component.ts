import {Component,OnInit} from "@angular/core";
import { MenuItemsService } from "../../services";

@Component({
    selector: 'main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
    constructor(public menuItemsService: MenuItemsService){}
    ngOnInit(){}
}