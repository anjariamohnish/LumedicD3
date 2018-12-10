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
    this.color = 'green';
    this.dataset = [
      { name: '4', percent: 39.10 },
      { name: '22', percent: 32.51 },
      { name: '$45.5', percent: 13.68 },
    ];
    // this.width = 30;
  }

}
