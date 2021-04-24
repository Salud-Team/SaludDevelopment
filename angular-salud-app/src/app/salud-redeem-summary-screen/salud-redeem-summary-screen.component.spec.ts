import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaludRedeemSummaryScreenComponent } from './salud-redeem-summary-screen.component';

describe('SaludRedeemSummaryScreenComponent', () => {
  let component: SaludRedeemSummaryScreenComponent;
  let fixture: ComponentFixture<SaludRedeemSummaryScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaludRedeemSummaryScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaludRedeemSummaryScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
