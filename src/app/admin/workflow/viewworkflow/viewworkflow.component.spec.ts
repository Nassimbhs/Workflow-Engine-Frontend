import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewworkflowComponent } from './viewworkflow.component';

describe('ViewworkflowComponent', () => {
  let component: ViewworkflowComponent;
  let fixture: ComponentFixture<ViewworkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewworkflowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewworkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
