import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterModalPage } from './register-modal.page';

describe('RegisterModalPage', () => {
  let component: RegisterModalPage;
  let fixture: ComponentFixture<RegisterModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
