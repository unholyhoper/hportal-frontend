import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinesTableComponent } from './medecines-table.component';

describe('MedecinesTableComponent', () => {
  let component: MedecinesTableComponent;
  let fixture: ComponentFixture<MedecinesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedecinesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
