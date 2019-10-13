import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private afs: AngularFirestore) { }

  async getAllOrder() {
    const order = await this.afs.collection('order').snapshotChanges();
    return order;
  }

  updateOrder(orderId: string) {
    this.afs.collection('order').doc(orderId).update({status: 1})
  }
}
