import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsConfirmationModalComponent } from './steps-confirmation-modal.component';

describe('StepsConfirmationModalComponent', () => {
  let component: StepsConfirmationModalComponent;
  let fixture: ComponentFixture<StepsConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepsConfirmationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
