import { select } from 'd3-selection';
import { scaleLinear, scaleTime } from 'd3-scale';
import { axisLeft, axisBottom } from 'd3-axis';
import { area, curveCatmullRom } from 'd3-shape';
import { json } from 'd3-request';
import { timeParse } from 'd3-time-format';
import { min, max } from 'd3-array';
import responsify from './responsify';

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

json('data/area-data.json', (err, data) => {
    if (err) {
        throw err;
    }

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

    const yScale = scaleLinear()
        .domain([
            min(data, co => min(co.values, d => d.close)),
            max(data, co => max(co.values, d => d.close))
        ])
        .range([height, 0]);

    const yAxis = axisLeft(yScale);

    svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis);

    svg.append('g')
        .call(yAxis);

    const areaHandler = area()
        .x(d => xScale(d.date))
        .y0(yScale(yScale.domain()[0]))
        .y1(d => yScale(d.close))
        .curve(curveCatmullRom.alpha(0.5));

    svg
        .selectAll('.area')
        .data(data)
        .enter()
        .append('path')
        .attr('class', 'area')
        .attr('d', d => areaHandler(d.values))
        .style('stroke', (d, i) => ['#FF9900', '#3369E8'][i])
        .style('stroke-width', 2)
        .style('fill', (d, i) => ['#FF9900', '#3369E8'][i])
        .style('fill-opacity', 0.5);
});