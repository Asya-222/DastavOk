import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StatisticService } from "./statistic.service";
import { StatisticRoutingModule } from "./statistic-routing.module";
import { StatisticComponent } from "./statistic/statistic.component";
import { SharedModule, MaterialModule } from "../../../shared";
import { CalendarModule } from "primeng/calendar";
@NgModule({
    declarations:[StatisticComponent],
    imports:[CommonModule,FormsModule,ReactiveFormsModule,CalendarModule,StatisticRoutingModule,SharedModule,MaterialModule],
    exports:[],
    providers:[StatisticService,DatePipe]
})
export class StatisticModule{}