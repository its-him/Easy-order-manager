import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ReadFile } from 'ngx-file-helpers';
import { Observable } from 'rxjs';

import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

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

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore) {

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
          this.cuisineName.setValue("");
          this.cuisineImage.setValue("");

        });

      })
    });

  }
}
