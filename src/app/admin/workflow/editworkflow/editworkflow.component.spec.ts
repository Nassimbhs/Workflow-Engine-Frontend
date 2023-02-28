import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditworkflowComponent } from './editworkflow.component';

describe('EditworkflowComponent', () => {
  let component: EditworkflowComponent;
  let fixture: ComponentFixture<EditworkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditworkflowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditworkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
