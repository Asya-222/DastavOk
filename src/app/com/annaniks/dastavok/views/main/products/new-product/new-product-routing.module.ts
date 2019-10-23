import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";
import { NewProductComponent } from "./new-product/new-product.component";

const newProductRoutes: Routes = [
    {
        path:"",
        component: NewProductComponent
    },
    
]
@NgModule({
    imports:[RouterModule.forChild(newProductRoutes)],
    exports:[RouterModule]
})
export class NewProductRoutingModule{}