import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { State } from '../../../store/reducers';
import * as selectors from '../../../store/reducers/selectors';
import { StepsConfirmationDialogComponent } from '../steps-confirmation-dialog/steps-confirmation-dialog.component';

const STEPS: {[step: string]: {route: string, param?: boolean}} = {
  0: {route: '/dashboard'},
  1: {route: '/roles'},
  2: {route: '/reveal', param: true},
  3: {route: '/audio', param: true},
};

@Component({
  selector: 'app-top-section',
  templateUrl: './top-section.component.html',
  styleUrls: ['./top-section.component.scss']
})
export class TopSectionComponent implements OnInit {

  @Input()
  step: number;

  @Input()
  title: string;

  @Input()
  description: string;

  gameId: string;

  constructor(private router: Router, private store: Store<State>, public dialog: MatDialog) {
    this.store.pipe(select(selectors.selectGameId)).subscribe(id => {
      if (!!id) {
        this.gameId = id;
      }
    });
   }

  ngOnInit(): void {
  }

  redirect(step: number): void {
    if (this.step > step) {
      if(this.step > 1 && step < 2) {
        this.openDialog(step);
      } else {
       this.navigate(step);
      }
    }
  }
  
  openDialog(step: number): void {
    const dialogRef = this.dialog.open(StepsConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result) { 
        this.navigate(step);
      }
    });
  }

  navigate(step: number): void {
    if (!STEPS[step]) {
      this.router.navigate([STEPS[0].route]);
    }
    
    const routerParams = [STEPS[step].route];
    if (STEPS[step].param) {
      routerParams.push(this.gameId);
    }
    
    this.router.navigate(routerParams);
  }
 
}
