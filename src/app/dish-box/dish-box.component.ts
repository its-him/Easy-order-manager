import { Dish } from './../dish-add/dish-add.component';
import { Component, OnInit, Input } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/firestore';

@Component({
  selector: 'dish-box',
  templateUrl: './dish-box.component.html',
  styleUrls: ['./dish-box.component.css']
})
export class DishBoxComponent implements OnInit {

  @Input() dish: DocumentChangeAction<Dish>;
  constructor() { }

  ngOnInit() {
  }

  delete() {
    this.dish.payload.doc.ref.delete().then(() => {
      console.log('Item Deleted');
    })
  }

}
