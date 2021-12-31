import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export const STORED_LANGUAGE_KEY = 'selectedLang';

@Component({
  selector: 'app-lang-switch',
  templateUrl: './lang-switch.component.html',
  styleUrls: ['./lang-switch.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LangSwitchComponent implements OnInit {

  selectedLang: string;

  constructor(private translate: TranslateService) {
    this.selectedLang = translate.currentLang;
  }

  ngOnInit(): void {
  }

  selectLang(lang: string): void {
    localStorage.setItem(STORED_LANGUAGE_KEY, lang);
    this.selectedLang = lang;
    this.translate.use(this.selectedLang);
  }
}
