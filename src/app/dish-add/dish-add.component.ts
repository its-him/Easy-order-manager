import { ActivatedRoute } from '@angular/router';
import { CuisineService } from './../services/cuisine.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { AngularFirestore, DocumentChangeAction, DocumentSnapshot } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Cuisine } from '../cuisine-add/cuisine-add.component';
import { ReadFile } from 'ngx-file-helpers';
import { Observable } from 'rxjs';
import { DishService } from '../services/dish.service';

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
  cuisines: Observable<DocumentChangeAction<Cuisine>[]>;
  selectedCuisine;
  image: File;
  id: String;
  dishPayload: DocumentSnapshot<Dish>;

  dishForm: FormGroup;
  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private cuisineService: CuisineService,
    private dishService: DishService,
    private route: ActivatedRoute
  ) {
    this.id = route.snapshot.paramMap.get('id');
    if (this.id != 'new')
      this.getDish();
    this.getCusine();
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    if (this.id == 'new') {
      this.dishForm = new FormGroup({
        'dishName': new FormControl('', Validators.required),
        'dishDescription': new FormControl('', Validators.required),
        'dishPrice': new FormControl('', Validators.required),
        'dishImage': new FormControl('', Validators.required),
        'dishCuisine': new FormControl('', Validators.required),
      });
    }
    if (this.dishPayload) {
      this.dishForm = new FormGroup({
        'dishName': new FormControl(this.dishPayload.get('name'), Validators.required),
        'dishDescription': new FormControl(this.dishPayload.get('description'), Validators.required),
        'dishPrice': new FormControl(this.dishPayload.get('price'), Validators.required),
        'dishImage': new FormControl(this.dishPayload.get('imagePath'), Validators.required),
        'dishCuisine': new FormControl(this.dishPayload.get('cuisine'), Validators.required),
      });
    }
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
    console.log(this.selectedCuisine);
  }

  async getCusine() {
    this.cuisines = await this.cuisineService.getAllCuisine();
  }

  submit() {
    if (this.id == 'new') {
      const ref = this.storage.ref('images/' + this.dishImage.value);
      ref.put(this.image).then(a => {
        ref.getDownloadURL().subscribe(path => {
          const dish = this.afs.collection<Dish>('dish');
          dish.add({
            name: this.dishName.value,
            description: this.dishDescription.value,
            price: this.dishPrice.value,
            imagePath: path,
            cuisine: this.selectedCuisine
          }).then(b => {
            console.log(b);

            this.dishForm.reset();
          });
        });
      });
    } else {
      if (this.dishPayload.get('imagePath') != this.dishImage.value) {
        const ref = this.storage.ref('images/' + this.dishImage.value);
        ref.put(this.image).then(a => {
          ref.getDownloadURL().subscribe(path => {
            this.dishPayload.ref.update({
              name: this.dishName.value,
              description: this.dishDescription.value,
              price: this.dishPrice.value,
              imagePath: path,
              cuisine: this.selectedCuisine
            }).then(b => {
              this.dishForm.reset();
            });
          });
        });
      } else {
        this.dishPayload.ref.update({
          name: this.dishName.value,
          description: this.dishDescription.value,
          price: this.dishPrice.value,
          cuisine: this.selectedCuisine
        }).then(b => {
          this.dishForm.reset();
        });
      }
    }

  }

  async getDish() {
    (await this.dishService.getDish(this.id)).subscribe(dish => {
      this.dishPayload = dish.payload;
      console.log(dish.payload.get('cuisine'));
      this.initialize();
    });
  }
}
