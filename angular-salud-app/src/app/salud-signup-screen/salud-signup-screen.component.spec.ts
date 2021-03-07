import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaludSignupScreenComponent } from './salud-signup-screen.component';

describe('SaludSignupScreenComponent', () => {
  let component: SaludSignupScreenComponent;
  let fixture: ComponentFixture<SaludSignupScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaludSignupScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaludSignupScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
