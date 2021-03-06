
// var dataset = {
//     apples: [53245, 28479, 19697, 24037, 40245],
//     oranges: [53245, 28479, 19697, 24037, 40245, 20202] // previously 5 values, now only 4
// };

var dataset = {
    apples: [20, 30, 40],
    oranges: [20, 30, 40, 50] // previously 5 values, now only 4
};

const parentEl = document.getElementById('abc').parentNode.parentElement;
const width = parentEl.clientWidth, height = parentEl.clientHeight;

// var radius = Math.min(width, height) / 2;

const outerRadius = Math.min(height / 2, width / 3.5) - 5;
const innerRadius = outerRadius / 1.3;


var enterAntiClockwise = {
    startAngle: Math.PI * 2,
    endAngle: Math.PI * 2
};

var color = d3.scale.category20();

var pie = d3.layout.pie()
    .sort(null);

var arc = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

var svg = d3.select('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

var path = svg.selectAll('path')
    .data(pie(dataset.apples))
    .enter().append('path')
    .attr('fill', function (d, i) { return color(i); })
    .attr('d', arc)
    .each(function (d) { this._current = d; });

d3.selectAll('input').on('change', change);
var dt = null;

function change() {
    dt = pie(dataset[this.value]);
    path = path.data(pie(dataset[this.value]));
    path.enter().append('path')
        .attr('fill', function (d, i) {
            return color(i);
        })
        .attr('d', arc(enterAntiClockwise))
        .each(function (d) {
            console.log(this)
            this._current = {
                data: d.data,
                value: d.value,
                startAngle: enterAntiClockwise.startAngle,
                endAngle: enterAntiClockwise.endAngle
            };
            console.log('object', this._current)
        }); // store the initial values

    path.exit()
        .transition()
        .duration(750)
        .attrTween('d', arcTweenOut)
        .remove() // now remove the exiting arcs

    path.transition().duration(750).attrTween('d', arcTween); // redraw the arcs
}

// Store the displayed angles in _current.
// Then, interpolate from _current to the new angles.
// During the transition, _current is updated in-place by d3.interpolate.
function arcTween(a) {
    console.log(this._current);
    console.log(a);
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function (t) {
        return arc(i(t));
    };
}
// Interpolate exiting arcs start and end angles to Math.PI * 2
// so that they 'exit' at the end of the data
function arcTweenOut(a) {
    var i = d3.interpolate(this._current, { startAngle: Math.PI * 2, endAngle: Math.PI * 2, value: 0 });
    this._current = i(0);
    return function (t) {
        return arc(i(t));
    };
}