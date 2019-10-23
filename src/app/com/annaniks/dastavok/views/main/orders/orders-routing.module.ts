import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";
import { OrdersComponent } from "./orders/orders.component";
const routesOrders: Routes = [
    { path:"", component: OrdersComponent},
    { path: ":orderId", loadChildren: "src/app/com/annaniks/dastavok/views/main/orders/pageOfOrder/pageOfOrder.module#PageOfOrderModule"}
]
@NgModule({
    imports:[RouterModule.forChild(routesOrders)],
    exports:[RouterModule]
})
export class OrdersRoutingModule{}