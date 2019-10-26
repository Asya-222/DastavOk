import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuItemsService, AuthGuard, ApiService } from './com/annaniks/dastavok/services';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule, MaterialModule } from './com/annaniks/dastavok/shared';
import { CookieService } from 'angular2-cookie/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { GrowlModule } from 'primeng/growl';
import { MessageService } from 'primeng/components/common/messageservice';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule,
    MaterialModule,
    HttpClientModule,
    GrowlModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: 'BASE_URL', useValue: 'http://annaniks.com:16000/'
    },
    MenuItemsService,
    AuthGuard,
    CookieService,
    ApiService,
    MessageService
  ]
})
export class AppModule { }
