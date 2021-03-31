import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaludAddGiftScreenComponent } from './salud-add-gift-screen.component';

describe('SaludAddGiftScreenComponent', () => {
  let component: SaludAddGiftScreenComponent;
  let fixture: ComponentFixture<SaludAddGiftScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaludAddGiftScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaludAddGiftScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
