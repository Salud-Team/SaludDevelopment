import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaludMerchantMainScreenComponent } from './salud-merchant-main-screen.component';

describe('SaludMerchantMainScreenComponent', () => {
  let component: SaludMerchantMainScreenComponent;
  let fixture: ComponentFixture<SaludMerchantMainScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaludMerchantMainScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaludMerchantMainScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
