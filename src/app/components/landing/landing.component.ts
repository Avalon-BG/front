import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  host: { class: 'component-container' }
})
export class LandingComponent implements OnInit {

  usedLang = 'en';
  nbFireflies: number;

  constructor(private router: Router, private translate: TranslateService) {
    this.usedLang = this.translate.currentLang;
    this.translate.onLangChange.subscribe(changes => {
      this.usedLang = changes.lang;
    });
    this.nbFireflies = 15;
  }

  ngOnInit() {
  }

  get fireflies(): Array<number> {
    return Array.from(Array(this.nbFireflies).keys());
  }

  launchGame() {
    this.router.navigate(['dashboard']);
  }

  get pdfUrl(): string {
    return `/assets/rules/avalon-rules-${this.usedLang}.pdf`;
  }
}
