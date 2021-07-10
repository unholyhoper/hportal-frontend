import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormappointmentComponent } from './formappointment.component';

describe('FormappointmentComponent', () => {
  let component: FormappointmentComponent;
  let fixture: ComponentFixture<FormappointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormappointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormappointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
