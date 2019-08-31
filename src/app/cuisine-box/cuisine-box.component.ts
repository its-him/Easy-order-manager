import { Component, OnInit, Input } from '@angular/core';
import { Cuisine } from '../cuisine-add/cuisine-add.component';
import { DocumentChangeAction } from '@angular/fire/firestore';

@Component({
  selector: 'cuisine-box',
  templateUrl: './cuisine-box.component.html',
  styleUrls: ['./cuisine-box.component.css']
})
export class CuisineBoxComponent implements OnInit {
  @Input() cuisine: DocumentChangeAction<Cuisine>;

  constructor() { }

  ngOnInit() {
    console.log();
  }

  delete() {
    this.cuisine.payload.doc.ref.delete().then(() => {
      console.log('Item Deleted');
    })
  }
}
