import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaludLoadingScreenComponent } from './salud-loading-screen.component';

describe('SaludLoadingScreenComponent', () => {
  let component: SaludLoadingScreenComponent;
  let fixture: ComponentFixture<SaludLoadingScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaludLoadingScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaludLoadingScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
