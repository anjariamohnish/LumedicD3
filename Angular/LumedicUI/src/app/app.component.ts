import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  width: number;

  constructor() { }

  ngOnInit() {
    // this.width = 30;
  }

}
