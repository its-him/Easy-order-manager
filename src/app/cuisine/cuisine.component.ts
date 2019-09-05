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
  cuisines: DocumentChangeAction<Cuisine>[];
  filterCuisine: DocumentChangeAction<Cuisine>[];

  constructor(private cuisineService: CuisineService) { }

  ngOnInit() {
    this.getCusine();
  }

  async getCusine() {
    (await this.cuisineService.getAllCuisine()).subscribe(cuisine => {
      this.cuisines = cuisine;
      this.filterCuisine = cuisine;
    });
  }

  filter(value) {
    this.filterCuisine = (value) ?
      this.cuisines.filter(cuisine => cuisine.payload.doc.get('name').toLowerCase().includes(value.toLowerCase())) :
      this.cuisines;
  }
}
