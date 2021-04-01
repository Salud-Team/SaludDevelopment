import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaludOrderSummaryScreenComponent } from './salud-order-summary-screen.component';

describe('SaludOrderSummaryScreenComponent', () => {
  let component: SaludOrderSummaryScreenComponent;
  let fixture: ComponentFixture<SaludOrderSummaryScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaludOrderSummaryScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaludOrderSummaryScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
