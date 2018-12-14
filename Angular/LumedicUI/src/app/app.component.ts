import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  width: number;
  color: string;
  dataset: Array<any>;
  dataset2: Array<any>;
  donutText: string;
  subText: string;

  constructor() { }

  ngOnInit() {
    // this.color = 'green';
    this.dataset = [
      { name: '1', percent: 20 },
      { name: '2', percent: 20 },
      { name: '3', percent: 20 },
    ];
    this.dataset2 = [20, 30, 40];
    this.donutText = '650';
    this.subText = 'PreAuth';
    // this.width = 30;
  }


  add() {
    this.dataset2.push(50);
    // this.dataset.push({ name: '4', percent: 10 });
    this.dataset2 = this.dataset2.slice();
  }

  remove() {
    this.dataset2.pop();
    // this.dataset.pop();
    this.dataset2 = this.dataset2.slice();
  }
  update() {
    this.dataset2[2] = 10;
    // this.dataset[3] = { name: '3', percent: 15 };
    this.dataset2 = this.dataset2.slice();
  }
}
