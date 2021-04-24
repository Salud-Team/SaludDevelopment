import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaludRedeemOrderScreenComponent } from './salud-redeem-order-screen.component';

describe('SaludRedeemOrderScreenComponent', () => {
  let component: SaludRedeemOrderScreenComponent;
  let fixture: ComponentFixture<SaludRedeemOrderScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaludRedeemOrderScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaludRedeemOrderScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
