import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";
import { BasketComponent } from "./basket/basket.component";
const routesBasket: Routes = [
    {
        path:"",
        component: BasketComponent
    }
]
@NgModule({
    imports:[RouterModule.forChild(routesBasket)],
    exports:[RouterModule]
})
export class BasketRoutingModule{}