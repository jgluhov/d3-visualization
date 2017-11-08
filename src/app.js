import { select } from 'd3-selection';
import { scaleLinear, scaleTime } from 'd3-scale';
import { min, max } from 'd3-array';
import { axisLeft, axisBottom } from 'd3-axis';
import { json } from 'd3-request';
import { timeParse } from 'd3-time-format'
import { line, curveCatmullRom } from 'd3-shape';

const margin = {
    top: 5,
    right: 15,
    bottom: 40,
    left: 30
};

const width = 425 - margin.left - margin.right;
const height = 625 - margin.top - margin.bottom;

const svg = select('.chart')
    .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .call(responsify)
    .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

const colours = [
    '#FF9900',
    '#3369E8'
];

json('data/line-data.json', (err, data) => {
    const parseTime = timeParse('%Y/%m/%d');
    data.forEach(company => {
        company.values.forEach(d => {
            d.date = parseTime(d.date);
            d.close = +d.close;
        });
    });

    const xScale = scaleTime()
        .domain([
            min(data, co => min(co.values, d => d.date)),
            max(data, co => max(co.values, d => d.date))
        ])
        .range([0, width]);

    const xAxis = axisBottom(xScale)
        .ticks(5);

    svg
        .append('g')
            .attr('transform', `translate(0, ${height})`)
        .call(xAxis);

    const yScale = scaleLinear()
        .domain([
            min(data, co => min(co.values, d => d.close)),
            max(data, co => max(co.values, d => d.close))
        ])
        .range([height, 0]);

    const yAxis = axisLeft(yScale);

    svg
        .append('g')
        .call(yAxis);

    const lineFn = line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.close))
        .curve(curveCatmullRom.alpha(0.5));

    svg
        .selectAll('.line')
        .data(data)
        .enter()
        .append('path')
        .attr('class', 'line')
        .attr('d', d => lineFn(d.values))
        .style('stroke', (d, i) => colours[i])
        .style('stroke-width', 2)
        .style('fill', 'none');
});

function responsify(svg) {
    const container = select(svg.node().parentNode),
        width = parseInt(svg.style('width')),
        height = parseInt(svg.style('height')),
        aspect = width / height;

    const resize = () => {
        const targetWidth = parseInt(container.style('width'));

        svg.attr('width', targetWidth);
        svg.attr('height', Math.round(targetWidth / aspect));
    };

    svg.attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMinYMid')
        .call(resize);

    select(window).on(`resize.${container.attr('id')}`, resize);
}