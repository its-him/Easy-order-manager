import { DocumentChangeAction } from '@angular/fire/firestore';
import { OrderService } from './../services/order.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  closeResult: string;
  orders;
  items;
  constructor(private modalService: NgbModal, private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getAllOrder().subscribe(order => this.orders = order);

  }

  open(content) {
    console.log(content);
    this.items = content;
    this.modalService.open(content).result.then((result) => {
      this.items = null;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
