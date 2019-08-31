import { DishService } from './../services/dish.service';
import { Dish } from './../dish-add/dish-add.component';
import { CuisineService } from './../services/cuisine.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentChangeAction } from '@angular/fire/firestore';

@Component({
  selector: 'dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {
  dishes: Observable<DocumentChangeAction<Dish>[]>;

  constructor(
    private dishService: DishService
  ) { }

  ngOnInit() {
    this.getCusine();
  }

  async getCusine() {
    this.dishes = await this.dishService.getAllDish();
    // console.log(this.dishes);
  }

}
