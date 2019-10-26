import { NgModule } from '@angular/core';
import {
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    LoadingComponent,
    PaginatorComponent,
    LoadingFullScreenComponent
} from '../components';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChartModule } from 'primeng/primeng';
import { MaterialModule } from './material.module';
import { GalleriaModule } from 'primeng/galleria';
import {
    AddToppingModal,
    EditPasswordModal,
    ViewDetailsOfDishModal
} from '../modals';
import { ReactiveFormsModule } from '@angular/forms';
import { OnlyNumber } from '../directives';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        OnlyNumber,
        LoadingFullScreenComponent,
        HeaderComponent,
        MenuComponent, FooterComponent,
        LoadingComponent,
        PaginatorComponent,
        AddToppingModal,
        EditPasswordModal,
        ViewDetailsOfDishModal
    ],
    imports: [
        TranslateModule,
        CommonModule,
        RouterModule,
        ChartModule,
        MaterialModule,
        GalleriaModule,
        ReactiveFormsModule
    ],
    exports: [
        TranslateModule,
        OnlyNumber,
        LoadingFullScreenComponent,
        HeaderComponent,
        CommonModule,
        MenuComponent,
        FooterComponent,
        ChartModule,
        LoadingComponent,
        PaginatorComponent,
        GalleriaModule,
        ViewDetailsOfDishModal,
        AddToppingModal,
        EditPasswordModal
    ],
    entryComponents: [
        AddToppingModal,
        EditPasswordModal,
        ViewDetailsOfDishModal
    ]
})
export class SharedModule { }
