import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaludWelcomeScreenComponent } from './salud-welcome-screen.component';

describe('SaludWelcomeScreenComponent', () => {
  let component: SaludWelcomeScreenComponent;
  let fixture: ComponentFixture<SaludWelcomeScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaludWelcomeScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaludWelcomeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
