import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaludLoginPersonalScreenComponent } from './salud-login-personal-screen.component';

describe('SaludLoginPersonalScreenComponent', () => {
  let component: SaludLoginPersonalScreenComponent;
  let fixture: ComponentFixture<SaludLoginPersonalScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaludLoginPersonalScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaludLoginPersonalScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
