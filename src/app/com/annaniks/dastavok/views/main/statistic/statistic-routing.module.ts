import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";
import { StatisticComponent } from "./statistic/statistic.component";
const routesStatistic: Routes = [
    {
        path:"",
        component: StatisticComponent
    }
]
@NgModule({
    imports:[RouterModule.forChild(routesStatistic)],
    exports:[RouterModule]
})
export class StatisticRoutingModule{}