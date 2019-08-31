import { CuisineService } from './../services/cuisine.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ReadFile } from 'ngx-file-helpers';
import { Observable } from 'rxjs';

import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection, DocumentSnapshot } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

export interface Cuisine {
  name: String,
  imagePath: String
};

@Component({
  selector: 'cuisine-add',
  templateUrl: './cuisine-add.component.html',
  styleUrls: ['./cuisine-add.component.css']
})
export class CuisineAddComponent implements OnInit {


  CuisineForm: FormGroup;
  image: File;
  id: String;
  cuisinePayload: DocumentSnapshot<Cuisine>;

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private cuisineService: CuisineService) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getCuisine();
  }

  ngOnInit() {
    this.CuisineForm = new FormGroup({
      'cuisineName': new FormControl('', Validators.required),
      'cuisineImage': new FormControl('', Validators.required)
    });
  }

  get cuisineName() { return this.CuisineForm.get('cuisineName'); }
  get cuisineImage() { return this.CuisineForm.get('cuisineImage'); }

  onImageSelect(image: ReadFile) {
    this.image = image.underlyingFile;
    this.cuisineImage.setValue(image.name);
  }

  submit() {
    const ref = this.storage.ref('images/' + this.cuisineImage.value);

    ref.put(this.image).then(a => {
      ref.getDownloadURL().subscribe(path => {

        const cuisine = this.afs.collection<Cuisine>('cuisine');
        cuisine.add({ name: this.cuisineName.value, imagePath: path }).then(b => {
          this.CuisineForm.reset();
        });
      })
    });
  }

  async getCuisine() {
    (await this.cuisineService.getCuisine(this.id)).subscribe(cuisine => {
      this.cuisinePayload = cuisine.payload;
      console.log(cuisine.payload.get('name'));
      cuisine.payload.ref.update({});
    });
  }
}
