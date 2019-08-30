import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Cuisine } from '../cuisine-add/cuisine-add.component';
import { ReadFile } from 'ngx-file-helpers';

export interface Dish {
  name: String,
  price: number,
  description: String,
  cuisine: String,
  imagePath: String
};

@Component({
  selector: 'dish-add',
  templateUrl: './dish-add.component.html',
  styleUrls: ['./dish-add.component.css']
})
export class DishAddComponent implements OnInit {
  private cuisineCollection: AngularFirestoreCollection<Cuisine>;
  cuisine: Cuisine[];
  selectedCuisine;
  image: File;

  dishForm: FormGroup;
  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.getCusine();
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

  onImageSelect(image: ReadFile) {
    this.image = image.underlyingFile;
    this.dishImage.setValue(image.name);
  }

  selected() {
    console.log(this.selectedCuisine.name);
  }

  getCusine() {
    this.cuisineCollection = this.afs.collection<Cuisine>('cuisine');
    this.cuisineCollection.valueChanges().subscribe(cusine => {
      this.cuisine = cusine;
    });
  }

  submit() {
    const ref = this.storage.ref('images/' + this.dishImage.value);
    ref.put(this.image).then(a => {
      ref.getDownloadURL().subscribe(path => {
        const dish = this.afs.collection<Dish>('dish');
        dish.add({
          name: this.dishName.value,
          description: this.dishDescription.value,
          price: this.dishPrice.value,
          imagePath: path,
          cuisine: this.selectedCuisine.name
        }).then(b => {
          console.log(b);

          this.dishForm.reset();
        });
      });
    });
  }
}
