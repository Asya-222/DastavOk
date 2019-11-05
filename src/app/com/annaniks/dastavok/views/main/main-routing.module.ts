import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainComponent } from "./main.component";
const routesMain: Routes = [
  {
    path: "",
    component: MainComponent,
    children: [

      {
        path: '',
        redirectTo: "/dashboard",
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: "src/app/com/annaniks/dastavok/views/main/dashboard/dashboard.module#DashboardModule"
      },
      {
        path: 'statistic',
        loadChildren: "src/app/com/annaniks/dastavok/views/main/statistic/statistic.module#StatisticModule"
      },
      {
        path: 'settings',
        loadChildren: "src/app/com/annaniks/dastavok/views/main/settings/settings.module#SettingsModule"
      },
      {
        path: 'products',
        loadChildren: "src/app/com/annaniks/dastavok/views/main/products/products.module#ProductsModule"
      },
      {
        path: 'orders/:orderStatus',
        loadChildren: "src/app/com/annaniks/dastavok/views/main/orders/orders.module#OrdersModule"
      },
      {
        path: 'basket',
        loadChildren: "src/app/com/annaniks/dastavok/views/main/basket/basket.module#BasketModule"
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routesMain)],
  exports: [RouterModule]
})
export class MainRoutingModule { }