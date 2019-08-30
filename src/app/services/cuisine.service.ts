import { Injectable } from '@angular/core';

import { Cuisine } from '../cuisine-add/cuisine-add.component';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class CuisineService {
  private cuisineCollection: AngularFirestoreCollection<Cuisine>;

  constructor(private afs: AngularFirestore) { }


  async getCuisine() {
    this.cuisineCollection = this.afs.collection<Cuisine>('cuisine');
    const cuisine = await this.cuisineCollection.valueChanges();
    return cuisine;
  }
}
