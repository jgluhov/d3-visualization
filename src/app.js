import { select } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { axisLeft, axisBottom } from 'd3-axis';
import { timeMinute } from 'd3-time';

const margin = {
    top: 5,
    right: 0,
    bottom: 60,
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

const data = [
    {score: 63, subject: 'Mathematics'},
    {score: 82, subject: 'Geography'},
    {score: 74, subject: 'Spelling'},
    {score: 57, subject: 'Reading'},
    {score: 52, subject: 'Science'}
];

const xScale = scaleBand()
    .paddingInner(0.2)
    .paddingOuter(0.1)
    .domain(data.map(d => d.subject))
    .range([0, width]);

const yScale = scaleLinear()
    .domain([0, 100])
    .range([height, 0]);

svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x',  d => xScale(d.subject))
    .attr('y', d => yScale(d.score))
    .attr('width', d => xScale.bandwidth())
    .attr('height', d => height - yScale(d.score))
    .style('fill', 'steelblue');

const yAxis = axisLeft(yScale)
    .ticks(10);

const xAxis = axisBottom(xScale)
    .ticks(timeMinute.every(60))
    .tickSize(10)
    .tickSizeInner(10)
    .tickSizeOuter(20)
    .tickPadding(10);

svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis)
    .selectAll('text')
        .style('text-anchor', 'end')
        .style('transform', 'rotate(-45deg)');

svg.append('g')
    .call(yAxis)
    .selectAll('text')
        .style('text-anchor', 'end')
        .style('transform', 'rotate(-45deg)');

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