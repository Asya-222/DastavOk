import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MainService } from "./main.service";
import { MainRoutingModule } from "./main-routing.module";
import { MainComponent } from "./main.component";
import { SharedModule, MaterialModule } from "../../shared";
@NgModule({
    declarations: [MainComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MainRoutingModule, SharedModule,MaterialModule],
    exports: [],
    providers: [MainService]
})
export class MainModule {

}