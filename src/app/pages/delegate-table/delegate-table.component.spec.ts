import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegateTableComponent } from './delegate-table.component';

describe('DelegateTableComponent', () => {
  let component: DelegateTableComponent;
  let fixture: ComponentFixture<DelegateTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelegateTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelegateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
