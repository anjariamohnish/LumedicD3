import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-donut',
    templateUrl: './donut.component.html',
    styleUrls: ['./donut.component.css']
})
export class DonutComponent implements OnInit, OnChanges {

    componentId: string;
    path: any;
    svg: any;
    pie: any;
    arc: any;
    color: any;

    @Input() dataset: Array<any>;

    constructor() { }

    ngOnInit() {
        this.componentId = this.generateId();
        document.getElementById('donut').setAttribute('id', this.componentId);
        this.draw();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['dataset'] && changes['dataset'].previousValue !== undefined) {
            this.update();
        }
    }


    draw() {
        const parentEl = document.getElementById(this.componentId).parentNode.parentElement;
        const w = parentEl.clientWidth, h = parentEl.clientHeight;
        const outerRadius = Math.min(h / 2, w / 3.5) - 5;
        const innerRadius = outerRadius / 1.3;
        this.pie = d3.pie()
            .value((d) => d.percent)
            .sort(null);
        // .padAngle(.03);

        this.color = d3.scaleOrdinal(d3.schemeCategory10);

        this.arc = d3.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius);

        this.svg = d3.select('#' + this.componentId)
            .attr('width', w)
            .attr('height', h)
            .append('g')
            .attr('transform', 'translate(' + w / 2 + ',' + h / 2 + ')');


        this.path = this.svg.selectAll('path')
            .data(this.pie(this.dataset))
            .enter()
            .append('path')
            .attr('d', this.arc)
            .attr('fill', (d, i) => this.color(d.data.name));

        // const centroid = [];

        // const texts = d3.select('g')
        //     .selectAll('text')
        //     .data(pie(this.dataset))
        //     .enter()
        //     .append('text')
        //     .each((d) => {
        //         centroid.push(arc.centroid(d));
        //     })
        //     .style('font-size', '1vw')
        //     .attr('x', (d, i) => centroid[i][0])
        //     .attr('y', (d, i) => centroid[i][1])
        //     // .attr('dy', '0.35em')
        //     .text((d) => d.data.name)
        //     .attr('fill', 'white');



        this.path.transition()
            .duration(1000)
            .attrTween('d', (d) => {
                const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
                return (t) => {
                    return this.arc(interpolate(t));
                };
            });


    }


    update() {
        this.path.data([]).exit().remove();
        // this.texts.data([]).exit().remove();

        this.path = this.svg.selectAll('path')
            .data(this.pie(this.dataset))
            .enter()
            .append('path')
            .attr('d', this.arc)
            .attr('fill', (d, i) => this.color(d.data.name));


        // centroid = [];
        // texts = d3.select('g')
        //     .selectAll('text')
        //     .data(pie(dataset))
        //     .enter()
        //     .append('text')
        //     .each((d) => {
        //         centroid.push(arc.centroid(d));
        //     })
        //     .attr('x', (d, i) => { return centroid[i][0] })
        //     .attr('y', (d, i) => { return centroid[i][1] })
        //     // .attr('dy', '0.35em')
        //     .text((d) => { return d.data.name })
        //     .attr('fill', 'white')

        // console.log(pie(dataset))
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
