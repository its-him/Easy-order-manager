import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dish-add',
  templateUrl: './dish-add.component.html',
  styleUrls: ['./dish-add.component.css']
})
export class DishAddComponent implements OnInit {

  dishForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.dishForm = new FormGroup({
      'dishName': new FormControl('', Validators.required),
      'dishDescription': new FormControl('', Validators.required),
      'dishPrice': new FormControl('', Validators.required),
      'dishImage': new FormControl('', Validators.required),
      'dishCuisine': new FormControl('', Validators.required),
    });
  }

  get dishName() { return this.dishForm.get('dishName'); }
  get dishDescription() { return this.dishForm.get('dishDescription'); }
  get dishPrice() { return this.dishForm.get('dishPrice'); }
  get dishImage() { return this.dishForm.get('dishImage'); }
  get dishCuisine() { return this.dishForm.get('dishCuisine'); }

}
