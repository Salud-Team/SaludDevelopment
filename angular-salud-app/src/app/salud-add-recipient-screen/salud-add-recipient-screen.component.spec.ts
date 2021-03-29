import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaludAddRecipientScreenComponent } from './salud-add-recipient-screen.component';

describe('SaludAddRecipientScreenComponent', () => {
  let component: SaludAddRecipientScreenComponent;
  let fixture: ComponentFixture<SaludAddRecipientScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaludAddRecipientScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaludAddRecipientScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
