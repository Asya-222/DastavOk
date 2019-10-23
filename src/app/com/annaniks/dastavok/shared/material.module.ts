import { NgModule } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule, MatDialogModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@NgModule({
    declarations: [],
    imports: [MatFormFieldModule,MatInputModule,MatDialogModule,MatSelectModule,MatTableModule,MatExpansionModule,MatProgressSpinnerModule,MatCheckboxModule,MatSlideToggleModule],
    exports: [MatFormFieldModule,MatInputModule,MatDialogModule,MatSelectModule,MatTableModule,MatExpansionModule,MatProgressSpinnerModule,MatCheckboxModule,MatSlideToggleModule]
})
export class MaterialModule { }