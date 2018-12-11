import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import * as d3 from 'd3';
import WatchJS from 'melanke-watchjs';

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
    watch: any;

    @Input() dataset: Array<any>;

    constructor() { this.watch = WatchJS.watch; }

    ngOnInit() {
        // this.watch(this.dataset, this.getChanges);
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
            .data(this.pie(this.generateDataSet(this.dataset)))
            .enter()
            .append('path')
            .attr('d', this.arc)
            .attr('fill', (d, i) => d.data.name !== 'dummy' ? this.color(d.data.name) : '#F8F8F8');
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

        const newDataset = this.pie(this.generateDataSet(this.dataset));
        const lastNodeIndex = newDataset[newDataset.length - 2].index;

        this.path = this.svg.selectAll('path')
            .data(this.pie(this.generateDataSet(this.dataset)))
            .enter()
            .append('path')
            .attr('d', this.arc)
            .attr('fill', (d, i) => d.data.name !== 'dummy' ? this.color(d.data.name) : '#F8F8F8');

        this.path.transition()
            .duration(1000)
            .attrTween('d', (d) => {
                if (d.index === lastNodeIndex) {
                    const i = d3.interpolate(d.startAngle, d.endAngle);
                    return (t) => {
                        d.endAngle = i(t);
                        return this.arc(d);
                    };
                }
            });

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

    getChanges(index, action, newvalue, oldvalue) {
        console.log('index', index);
        console.log('action', action);
        console.log('newvalue', newvalue);
        console.log('oldvalue', oldvalue);
    }

    generateDataSet(dataset: Array<any>) {
        let dummyIndex = -1;
        dataset.forEach((data, index) => {
            if (data.name === 'dummy') {
                dummyIndex = index;
            }
        });
        if (dummyIndex !== -1) {
            dataset.splice(dummyIndex, 1);
        }
        let totalPercent = 0;
        dataset.forEach(data => {
            totalPercent += data.percent;
        });
        if (totalPercent < 100) {
            dataset.push({ name: 'dummy', percent: 100 - totalPercent });
        }
        return dataset;
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
