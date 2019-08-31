import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishBoxComponent } from './dish-box.component';

describe('DishBoxComponent', () => {
  let component: DishBoxComponent;
  let fixture: ComponentFixture<DishBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
