import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PageOfOrderService } from "./pageOfOrder.service";
import { PageOfOrderRoutingModule } from "./pageOfOrder-routing.module";
import { PageOfOrderComponent } from "./pageOfOrder/pageOfOrder.component";
import { SharedModule } from "../../../../shared/shared.module"
import { ConfirmForChangeOrderPlaceModal } from "../../../../modals";
@NgModule({
    declarations:[PageOfOrderComponent,ConfirmForChangeOrderPlaceModal],
    imports:[CommonModule,FormsModule,ReactiveFormsModule,PageOfOrderRoutingModule,SharedModule],
    exports:[],
    providers:[PageOfOrderService],
    entryComponents: [ConfirmForChangeOrderPlaceModal]
})
export class PageOfOrderModule{}