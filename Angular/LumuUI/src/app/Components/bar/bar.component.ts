import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit, OnChanges {


  horizontalBar: any;
  linearScale: any;
  componentId: string;

  @Input() width: number;
  @Input() color: string;

  constructor() { }

  ngOnInit() {
    this.componentId = this.generateId();
    document.getElementById('bar').setAttribute('id', this.componentId);

    const svg = d3.select('#' + this.componentId)
      .attr('width', '100%')
      .attr('height', '100%');

    this.linearScale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, svg.style('width')]);

    this.horizontalBar = svg.append('g')
      .append('rect')
      .attr('width', 0)
      .attr('height', '100%')
      .attr('fill', this.color);


    // svg.select('g')
    //   .append('text')
    //   .attr('x', 50)
    //   .attr('y', 20)
    //   .style('fill', 'white')
    //   .text('45.2');

    if (this.width) {
      this.horizontalBar.transition().attr('width', this.linearScale(this.width)).duration(800);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.horizontalBar && changes['width'].currentValue) {
      this.horizontalBar.transition().attr('width', this.linearScale(this.width)).duration(800);
    }
  }


  generateId() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < 7; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
