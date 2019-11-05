import { Component } from '@angular/core';
import { MenuItemsService } from './com/annaniks/dastavok/services';
import { TranslateService } from '@ngx-translate/core';
import { Router, Route } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DastavOk';

  constructor(translate: TranslateService,private _router: Router){
    if(localStorage.getItem("currentLanguage")){
      translate.use(localStorage.getItem("currentLanguage"));
    }else{
      translate.use('ru');
    }
    translate.setDefaultLang('ru');
    // this._router.navigate(["/dashboard"])
  }
  
}
