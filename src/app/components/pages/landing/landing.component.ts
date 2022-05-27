import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

const cardWidth = 232;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  host: { class: 'component-container' }
})
export class LandingComponent implements OnInit, OnDestroy {

  usedLang = 'en';
  cardDisplayed = 0;
  transform = "translateX(0px)";
  intervalId: number | undefined;

  constructor(private router: Router, private translate: TranslateService) {
    this.usedLang = this.translate.currentLang;
    this.translate.onLangChange.subscribe(changes => {
      this.usedLang = changes.lang;
    });
  }
  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  ngOnInit() {
    this.setInterval()
  }

  setInterval() {
    this.intervalId = window.setInterval(() => {
      this.cardDisplayed = (this.cardDisplayed + 1) % 3;
      this.setTransform(this.cardDisplayed)
    }, 5000);
  }

  launchGame() {
    this.router.navigate(['dashboard']);
  }

  setTransform(cardNumber: number) {
    this.transform = `translateX(-${cardWidth * cardNumber}px)`;
  }

  select(cardNumber: number) {
    this.cardDisplayed = cardNumber;
    this.setTransform(this.cardDisplayed);
    clearInterval(this.intervalId);
    this.setInterval();
  }

  get pdfUrl(): string {
    return `/assets/rules/avalon-rules-${this.usedLang}.pdf`;
  }
}
