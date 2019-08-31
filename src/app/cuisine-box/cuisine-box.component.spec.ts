import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuisineBoxComponent } from './cuisine-box.component';

describe('CuisineBoxComponent', () => {
  let component: CuisineBoxComponent;
  let fixture: ComponentFixture<CuisineBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuisineBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuisineBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
