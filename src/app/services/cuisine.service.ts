import { Injectable } from '@angular/core';

import { Cuisine } from '../cuisine-add/cuisine-add.component';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class CuisineService {
  private cuisineCollection: AngularFirestoreCollection<Cuisine>;

  constructor(private afs: AngularFirestore) { }


  async getAllCuisine() {
    this.cuisineCollection = this.afs.collection<Cuisine>('cuisine');
    const cuisine = await this.cuisineCollection.snapshotChanges();
    return cuisine;
  }

  getCuisine(id: String) {
    return this.afs.doc<Cuisine>('cuisine/' + id).snapshotChanges();
  }
}
