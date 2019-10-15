import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private afs: AngularFirestore) { }

  getAllOrder() {
    return this.afs.collection('order').snapshotChanges();
  }

  updateOrder(orderId: string) {
    this.afs.collection('order').doc(orderId).update({ status: 1 })
  }
}
