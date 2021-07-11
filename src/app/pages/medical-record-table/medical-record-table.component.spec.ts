import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalRecordTableComponent } from './medical-record-table.component';

describe('MedicalRecordTableComponent', () => {
  let component: MedicalRecordTableComponent;
  let fixture: ComponentFixture<MedicalRecordTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalRecordTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalRecordTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
