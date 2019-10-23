import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { OrdersService } from "./orders.service";
import { OrdersRoutingModule } from "./orders-routing.module";
import { OrdersComponent } from "./orders/orders.component";
import { SharedModule, MaterialModule } from "../../../shared";
import { OrderListComponent } from "../../../components";
import { OrdersListItemComponent } from "../../../components/order-list/orders-list-item/orders-list-item.component";
@NgModule({
    declarations:[OrdersComponent,OrderListComponent,OrdersListItemComponent],
    imports:[CommonModule,FormsModule,ReactiveFormsModule,OrdersRoutingModule,SharedModule,MaterialModule],
    exports:[],
    providers:[OrdersService],
   
})
export class OrdersModule{}