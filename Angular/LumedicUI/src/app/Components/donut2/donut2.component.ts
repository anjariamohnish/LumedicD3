import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
// import * as d3 from 'd3';
import WatchJS from 'melanke-watchjs';

declare var d3: any;

@Component({
    selector: 'app-donut2',
    templateUrl: './donut2.component.html',
    styleUrls: ['./donut2.component.css']
})
export class Donut2Component implements OnInit, OnChanges {

    componentId: string;
    path: any;
    svg: any;
    pie: any;
    arc: any;
    color: any;
    _current: any;
    enterAntiClockwise: any;

    @Input() dataset: Array<any>;



    constructor() { }

    ngOnInit() {
        this.componentId = this.generateId();
        document.getElementById('donut').setAttribute('id', this.componentId);
        this.draw();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['dataset'] && changes['dataset'].previousValue !== undefined) {
            this.change();
        }
    }


    draw() {
        this.enterAntiClockwise = {
            startAngle: Math.PI * 2,
            endAngle: Math.PI * 2
        };

        const parentEl = document.getElementById(this.componentId).parentNode.parentElement;
        const w = parentEl.clientWidth, h = parentEl.clientHeight;
        const outerRadius = Math.min(h / 2, w / 3.5) - 5;
        const innerRadius = outerRadius / 1.3;


        this.pie = d3.layout.pie()
            // .value((d) => d.percent)
            .sort(null);
        // .padAngle(.03);

        this.color = d3.scale.category20();

        this.arc = d3.svg.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius);

        this.svg = d3.select('#' + this.componentId)
            .attr('width', w)
            .attr('height', h)
            .append('g')
            .attr('transform', 'translate(' + w / 2 + ',' + h / 2 + ')');


        this.path = this.svg.selectAll('path')
            .data(this.pie(this.dataset))
            .enter().append('path')
            .attr('fill', (d, i) => this.color(i))
            .attr('d', this.arc)
            .each((d) => { this._current = d; });

    }


    change() {
        this.path = this.path.data(this.pie(this.dataset)); // update the data
        console.log(this.pie(this.dataset));
        // set the start and end angles to Math.PI * 2 so we can transition
        // anticlockwise to the actual values later
        this.path.enter().append('path')
            .attr('fill', (d, i) => {
                return this.color(i);
            })
            .attr('d', this.arc(this.enterAntiClockwise))
            .each((d) => {
                this._current = {
                    data: d.data,
                    value: d.value,
                    startAngle: this.enterAntiClockwise.startAngle,
                    endAngle: this.enterAntiClockwise.endAngle
                };
            }); // store the initial values

        this.path.exit()
            .transition()
            .duration(750)
            .attrTween('d', (d) => this.arcTweenOut(d))
            .remove();

        this.path.transition().duration(750).attrTween('d', (d) => this.arcTween(d)); // redraw the arcs

    }
    arcTween(a) {
        console.log(this._current);
        console.log(a);
        const i = d3.interpolate(this._current, a);
        this._current = i(0);
        return (t) => {
            return this.arc(i(t));
        };
    }
    arcTweenOut(a) {
        console.log(this._current);
        console.log(a);
        const i = d3.interpolate(this._current, { startAngle: Math.PI * 2, endAngle: Math.PI * 2, value: 0 });
        this._current = i(0);
        return (t) => {
            return this.arc(i(t));
        };
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
