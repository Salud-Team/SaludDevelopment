import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaludPersonalOrderScreenComponent } from './salud-personal-order-screen.component';

describe('SaludPersonalOrderScreenComponent', () => {
  let component: SaludPersonalOrderScreenComponent;
  let fixture: ComponentFixture<SaludPersonalOrderScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaludPersonalOrderScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaludPersonalOrderScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
