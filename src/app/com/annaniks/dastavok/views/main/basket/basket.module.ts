import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BasketService } from "./basket.service";
import { BasketRoutingModule } from "./basket-routing.module";
import { BasketComponent } from "./basket/basket.component";
import { SharedModule } from "../../../shared/shared.module";
import { ViewDetailsOfDishModal } from "../../../modals";
import { NewProductService } from "src/app/com/annaniks/dastavok/views/main/products/new-product/new-product.service";
import { ProductsService } from "src/app/com/annaniks/dastavok/views/main/products/products.service";
@NgModule({
    declarations:[BasketComponent],
    imports:[CommonModule,FormsModule,ReactiveFormsModule,BasketRoutingModule,SharedModule],
    exports:[],
    providers:[BasketService,DatePipe,NewProductService,ProductsService],
    entryComponents: []
})
export class BasketModule{}