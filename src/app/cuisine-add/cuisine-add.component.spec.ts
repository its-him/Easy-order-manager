import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuisineAddComponent } from './cuisine-add.component';

describe('CuisineAddComponent', () => {
  let component: CuisineAddComponent;
  let fixture: ComponentFixture<CuisineAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuisineAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuisineAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
