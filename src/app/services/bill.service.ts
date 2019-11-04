import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private afs: AngularFirestore) { }

  addToBill(orderId: string) {
    this.afs.collection('order').doc(orderId).snapshotChanges().pipe(take(1)).subscribe(async order => {
      var orderData = order.payload.data();
      orderData['date'] = (new Date()).toDateString();
      const bill = await this.afs.collection('bill').add(orderData);
      order.payload.ref.delete();
      console.log(bill);
    });
  }

  getAllBill() {
    return this.afs.collection('bill').snapshotChanges();
  }
}
