import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaludOrderConfirmationScreenComponent } from './salud-order-confirmation-screen.component';

describe('SaludOrderConfirmationScreenComponent', () => {
  let component: SaludOrderConfirmationScreenComponent;
  let fixture: ComponentFixture<SaludOrderConfirmationScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaludOrderConfirmationScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaludOrderConfirmationScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
