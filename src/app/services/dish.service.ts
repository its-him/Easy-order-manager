import { Dish } from './../dish-add/dish-add.component';
import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class DishService {
  private dishCollection: AngularFirestoreCollection<Dish>;

  constructor(private afs: AngularFirestore) { }

  async getAllDish() {
    this.dishCollection = this.afs.collection<Dish>('dish');
    const dish = await this.dishCollection.snapshotChanges();
    return dish;
  }

  getDish(id: String) {
    return this.afs.doc<Dish>('dish/' + id).snapshotChanges();
  }
}
