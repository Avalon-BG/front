import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const HANDLED_LANGUAGE: string[] = [
  'en',
  'fr'
];

const STORED_LANGUAGE_KEY = 'selectedLang';

@Component({
  selector: 'app-lang-switch',
  templateUrl: './lang-switch.component.html',
  styleUrls: ['./lang-switch.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LangSwitchComponent implements OnInit {

  selectedLang: string;

  constructor(private translate: TranslateService) {
    const browserLang = translate.getBrowserLang();
    const storedLang = localStorage.getItem(STORED_LANGUAGE_KEY);
    /**
     * 1st: LocalStorage stored Language
     * 2nd: Browser Language
     * 3rd: default (en)
     */
    this.selectedLang = storedLang ? storedLang : (HANDLED_LANGUAGE.includes(browserLang) ? browserLang : 'en');
  }

  ngOnInit(): void {
  }

  selectLang(lang: string): void {
    localStorage.setItem(STORED_LANGUAGE_KEY, lang);
    this.selectedLang = lang;
    this.translate.use(this.selectedLang);
  }
}
