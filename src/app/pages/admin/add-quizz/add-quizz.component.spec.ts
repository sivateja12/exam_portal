import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuizzComponent } from './add-quizz.component';

describe('AddQuizzComponent', () => {
  let component: AddQuizzComponent;
  let fixture: ComponentFixture<AddQuizzComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddQuizzComponent]
    });
    fixture = TestBed.createComponent(AddQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
