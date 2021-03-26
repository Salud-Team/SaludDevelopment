import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaludLoginMerchantScreenComponent } from './salud-login-merchant-screen.component';

describe('SaludLoginMerchantScreenComponent', () => {
  let component: SaludLoginMerchantScreenComponent;
  let fixture: ComponentFixture<SaludLoginMerchantScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaludLoginMerchantScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaludLoginMerchantScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
