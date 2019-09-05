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
  dishes: DocumentChangeAction<Dish>[];
  filterDishes: DocumentChangeAction<Dish>[];

  constructor(
    private dishService: DishService
  ) { }

  ngOnInit() {
    this.getCusine();
  }

  async getCusine() {
    (await this.dishService.getAllDish()).subscribe(dishes => {
      this.dishes = dishes;
      this.filterDishes = dishes;
    });
    // console.log(this.dishes);
  }

  filter(value) {
    this.filterDishes = (value) ?
      this.dishes.filter(cuisine => cuisine.payload.doc.get('name').toLowerCase().includes(value.toLowerCase())) :
      this.dishes;
  }

}
