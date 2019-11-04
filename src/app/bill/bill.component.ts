import { OrderDetailsComponent } from './../order-details/order-details.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BillService } from './../services/bill.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  bills;

  constructor(private billService: BillService, private modalService: NgbModal) { }

  ngOnInit() {
    this.billService.getAllBill().subscribe(bills => this.bills = bills);
  }

  open(content, customization) {
    const modalRef = this.modalService.open(OrderDetailsComponent, { centered: true });
    modalRef.componentInstance.items = content;
    modalRef.componentInstance.customization = customization;
  }

}
