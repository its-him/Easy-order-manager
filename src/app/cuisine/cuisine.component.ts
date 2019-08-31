import { CuisineService } from './../services/cuisine.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cuisine } from '../cuisine-add/cuisine-add.component';
import { DocumentChangeAction } from '@angular/fire/firestore';

@Component({
  selector: 'cuisine',
  templateUrl: './cuisine.component.html',
  styleUrls: ['./cuisine.component.css']
})
export class CuisineComponent implements OnInit {
  cuisines: Observable<DocumentChangeAction<Cuisine>[]>;


  constructor(private cuisineService: CuisineService) { }

  ngOnInit() {
    this.getCusine();
  }

  async getCusine() {
    this.cuisines = await this.cuisineService.getAllCuisine();

    // console.log(await this.cuisineService.getCuisine());
    // this.cuisines = await this.cuisineService.getCuisine();
  }
}
