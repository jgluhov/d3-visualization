import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { axisLeft, axisBottom } from 'd3-axis';

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

const yScale = scaleLinear()
    .domain([0, 100])
    .range([height, 0]);

const yAxis = axisLeft(yScale);

svg.append('g')
    .call(yAxis);

const xScale = scaleLinear()
    .domain([0, 100])
    .range([0, width]);


const xAxis = axisBottom(xScale);

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