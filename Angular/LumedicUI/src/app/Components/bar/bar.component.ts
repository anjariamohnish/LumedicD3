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

  @Input() width: number;

  constructor() { }

  ngOnInit() {
    const svg = d3.select('#moh')
      .attr('width', '100%')
      .attr('height', '100%');

    this.linearScale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, svg.style('width')]);


    this.horizontalBar = svg.append('g')
      .append('rect')
      .attr('width', 0)
      .attr('height', '100%')
      .attr('fill', 'orange');

    if (this.width) {
      this.horizontalBar.transition().attr('width', this.linearScale(this.width)).duration(800);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.horizontalBar && changes['width'].currentValue) {
      this.horizontalBar.transition().attr('width', this.linearScale(this.width)).duration(800);
    }
  }
}
