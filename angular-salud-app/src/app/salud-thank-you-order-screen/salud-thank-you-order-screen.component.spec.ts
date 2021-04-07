import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaludThankYouOrderScreenComponent } from './salud-thank-you-order-screen.component';

describe('SaludThankYouOrderScreenComponent', () => {
  let component: SaludThankYouOrderScreenComponent;
  let fixture: ComponentFixture<SaludThankYouOrderScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaludThankYouOrderScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaludThankYouOrderScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
