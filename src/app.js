import { select } from 'd3-selection';
import { scaleLinear, scaleTime, } from 'd3-scale';
import { axisLeft, axisBottom } from 'd3-axis';
import { timeMinute } from 'd3-time';

const margin = {
    top: 5,
    right: 0,
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

svg.append('rect')
    .attr('width', width)
    .attr('height', height)
    .style('fill', 'lightblue')
    .style('stroke', 'green');

const yScale = scaleLinear()
    .domain([0, 100])
    .range([height, 0]);

const yAxis = axisLeft(yScale)
    .ticks(10);

svg.append('g')
    .call(yAxis);

const xScale = scaleTime()
    .domain([new Date(2017, 0, 1, 6), new Date(2017, 0, 1, 9)])
    .range([0, width]);


const xAxis = axisBottom(xScale)
    .ticks(timeMinute.every(60))
    .tickSize(10)
    .tickSizeInner(10)
    .tickSizeOuter(20)
    .tickPadding(10);

svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis);

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