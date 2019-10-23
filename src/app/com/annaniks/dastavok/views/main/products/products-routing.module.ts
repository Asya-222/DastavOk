import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductsComponent } from "./products/products.component";

const routesProducts: Routes = [
    {
        path: "",
        component: ProductsComponent,

    },
    {
        path: 'new',
        loadChildren: 'src/app/com/annaniks/dastavok/views/main/products/new-product/new-product.module#NewProductModule'
    }

]
@NgModule({
    imports: [RouterModule.forChild(routesProducts)],
    exports: [RouterModule]
})
export class ProductsRoutingModule { }