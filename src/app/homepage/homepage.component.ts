import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  navOptions = ['order', 'cuisine', 'dish', 'customization'];
  selectNav = 'dish';

  constructor() { }

  ngOnInit() {
  }

  selectTab(option) {
    this.selectNav = option;
  }
}
