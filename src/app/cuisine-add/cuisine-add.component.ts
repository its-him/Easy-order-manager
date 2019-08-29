import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'cuisine-add',
  templateUrl: './cuisine-add.component.html',
  styleUrls: ['./cuisine-add.component.css']
})
export class CuisineAddComponent implements OnInit {

  CuisineForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.CuisineForm = new FormGroup({
      'cuisineName': new FormControl('', Validators.required),
      'cuisineImage': new FormControl('', Validators.required)
    });
  }

  get cuisineName() { return this.CuisineForm.get('cuisineName'); }
  get cuisineImage() { return this.CuisineForm.get('cuisineImage'); }

}
