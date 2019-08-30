import { CuisineService } from './../services/cuisine.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {

  constructor(
    private cusineService:CuisineService
  ) { }

  ngOnInit() {
  }

}
