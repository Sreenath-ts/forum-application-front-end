import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDetialComponent } from './question-detial.component';

describe('QuestionDetialComponent', () => {
  let component: QuestionDetialComponent;
  let fixture: ComponentFixture<QuestionDetialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionDetialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionDetialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
