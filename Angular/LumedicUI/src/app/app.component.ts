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

  constructor() { }

  ngOnInit() {
    // this.color = 'green';
    this.dataset = [
      { name: '1', percent: 20 },
      { name: '2', percent: 20 },
      { name: '3', percent: 20 },
    ];
    // this.width = 30;
  }


  add() {
    this.dataset.push({ name: '4', percent: 40 });
    this.dataset = this.dataset.slice();
  }
}
