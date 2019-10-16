import { OrderDetailsComponent } from './../order-details/order-details.component';
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

  open(content,customization) {
    console.log(content);
    const modalRef = this.modalService.open(OrderDetailsComponent);
    modalRef.componentInstance.items = content;
    modalRef.componentInstance.customization = customization;
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
