import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DashboardService } from "./dashboard.service";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SharedModule } from "../../../shared/shared.module";

@NgModule({
    declarations:[DashboardComponent],
    imports:[CommonModule,FormsModule,ReactiveFormsModule,DashboardRoutingModule,SharedModule],
    exports:[],
    providers:[DashboardService]
})
export class DashboardModule{}