import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsBarchartComponent } from './skills-barchart.component';

describe('SkillsBarchartComponent', () => {
  let component: SkillsBarchartComponent;
  let fixture: ComponentFixture<SkillsBarchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillsBarchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
