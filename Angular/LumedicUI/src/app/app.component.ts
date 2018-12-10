import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  width: number;
  color: string;

  constructor() { }

  ngOnInit() {
    this.color = 'green';
    // this.width = 30;
  }

}
