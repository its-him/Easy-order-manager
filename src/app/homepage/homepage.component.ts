import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  navOptions = [ 'cuisine', 'dish', 'order'];
  selectNav = 'order';

  constructor() { }

  ngOnInit() {
  }

  selectTab(option) {
    this.selectNav = option;
  }
}
