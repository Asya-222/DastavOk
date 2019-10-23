import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";
import { PageOfOrderComponent } from "./pageOfOrder/pageOfOrder.component";
const routesPageOfOrder: Routes = [
    { path:"",component: PageOfOrderComponent},
]
@NgModule({
    imports:[RouterModule.forChild(routesPageOfOrder)],
    exports:[RouterModule]
})
export class PageOfOrderRoutingModule{

}