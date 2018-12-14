import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import * as d3 from 'd3';
// declare var d3: any;

@Component({
    selector: 'app-donut2',
    templateUrl: './donut2.component.html',
    styleUrls: ['./donut2.component.css']
})
export class Donut2Component implements OnInit, OnChanges {

    public static donut: any;
    componentId: string;
    path: any;
    svg: any;
    pie: any;
    arc: any;
    color: any;
    enterAntiClockwise: any;

    @Input() dataset: Array<any>;

    constructor() { }

    ngOnInit() {
        this.componentId = this.generateId();
        document.getElementById('donut').setAttribute('id', this.componentId);
        this.draw();
        Donut2Component.donut = this;
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


        this.pie = d3.pie()
            // .value((d) => d.percent)
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
            .enter().append('path')
            .attr('fill', (d, i) => this.color(i))
            .attr('d', this.arc)
            .each(function (d) { this._current = d; });


        this.path.transition() // init transition
            .duration(1000)
            .attrTween('d', (d) => {
                const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
                return (t) => {
                    return this.arc(interpolate(t));
                };
            });
    }


    change() {
        this.path = this.path.data(this.pie(this.dataset));
        this.path.enter().append('path')
            .attr('fill', (d, i) => {
                return this.color(i);
            })
            .attr('d', this.arc(this.enterAntiClockwise))
            .each(function (d) {
                this._current = {
                    data: d.data,
                    value: d.value,
                    startAngle: Math.PI * 2,
                    endAngle: Math.PI * 2
                };
            });

        this.path.exit()
            .transition()
            .duration(750)
            .attrTween('d', function (d) {
                const i = d3.interpolate(this._current, { startAngle: Math.PI * 2, endAngle: Math.PI * 2, value: 0 });
                this._current = i(0);
                return (t) => {
                    return Donut2Component.donut.arc(i(t));
                };
            })
            .remove();

        this.path.transition().duration(750).attrTween('d', function (d) {
            const i = d3.interpolate(this._current, d);
            this._current = i(0);
            return (t) => {
                console.log(i(t));
                return Donut2Component.donut.arc(i(t));
            };
        });

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
