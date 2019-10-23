import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { DashboardInfo, Dashboard } from '../../../../models/models';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public dashboardData: Dashboard;
    public loading:boolean = false;
    constructor(private _dashboardService:DashboardService) { }
    ngOnInit() { 
        this.getDashboardInfo()
    }


    public getDashboardInfo():void{
        this.loading = true;
        this._dashboardService.getDashboardInfo().subscribe((data:DashboardInfo) => {
            console.log(data,'dashboard');
            this.loading = false
            this.dashboardData = data.message
        })
    }
}