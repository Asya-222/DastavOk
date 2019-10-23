import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NewProductComponent } from "./new-product/new-product.component";
import { MaterialModule, SharedModule } from "../../../../shared";
import { NewProductService } from "./new-product.service";
import { NewProductRoutingModule } from "./new-product-routing.module";
import { AddToppingModal } from "../../../../modals";
import { ApiService } from "../../../../services";
import { ProductPhotosComponent } from "../../../../components";



@NgModule({
    declarations:[NewProductComponent,ProductPhotosComponent],
    imports:[CommonModule,FormsModule,ReactiveFormsModule,MaterialModule,SharedModule,NewProductRoutingModule],
    exports:[],
    providers:[NewProductService,ApiService],
    
})
export class NewProductModule{}