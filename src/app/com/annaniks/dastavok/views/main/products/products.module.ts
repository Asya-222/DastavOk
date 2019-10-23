import { NgModule } from "@angular/core";
import { CommonModule,DatePipe} from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProductsService } from "./products.service";
import { ProductsRoutingModule } from "./products-routing.module";
import { ProductsComponent } from "./products/products.component";
import { MaterialModule, SharedModule } from "../../../shared";
import { ViewDetailsOfDishModal, AddToppingModal } from "../../../modals";
import { SettingsOfDishModal } from "../../../modals/settings-of-dish/settings-of-dish.modal";
import { NewProductService } from "./new-product/new-product.service";
import { LoadingFullScreenComponent } from "../../../components";

@NgModule({
    declarations:[ProductsComponent,SettingsOfDishModal],
    imports:[CommonModule,FormsModule,ReactiveFormsModule,ProductsRoutingModule,MaterialModule,SharedModule],
    exports:[],
    providers:[ProductsService,DatePipe,NewProductService],
    entryComponents: [SettingsOfDishModal]
})
export class ProductsModule{}