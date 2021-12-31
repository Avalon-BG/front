import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { getRules } from './store/actions/actions';
import { State } from './store/reducers';
import { STORED_LANGUAGE_KEY } from './components/common/lang-switch/lang-switch.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private store: Store<State>,
    private translate: TranslateService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    const storedLang = localStorage.getItem(STORED_LANGUAGE_KEY);
    translate.use(storedLang ? storedLang : (browserLang.match(/en|fr/) ? browserLang : 'en'));
  }

  ngOnInit(): void {
    this.store.dispatch(getRules());
  }
}
