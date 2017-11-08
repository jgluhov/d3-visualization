import { select } from 'd3-selection';
import { scaleLinear, scaleSqrt } from 'd3-scale';
import { axisLeft, axisBottom } from 'd3-axis';
import { json } from 'd3-request';
import { extent, max } from 'd3-array';

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

json('data/scatter-data.json', (err, data) => {
    const yScale = scaleLinear()
        .domain(extent(data, d => d.expectancy))
        .range([height, 0]);

    const yAxis = axisLeft(yScale)
        .ticks(10);

    svg.append('g')
        .call(yAxis);

    const xScale = scaleLinear()
        .domain(extent(data, d => d.cost))
        .range([0, width])
        .nice();


    const xAxis = axisBottom(xScale);

    svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis);

    const rScale = scaleSqrt()
        .domain([0, max(data, d => d.population)])
        .range([0, 40]);

    const circles = svg
        .selectAll('.ball')
        .data(data)
        .enter()
        .append('g')
        .classed('ball', true)
        .attr('transform', d => `translate(
            ${xScale(d.cost)}, 
            ${yScale(d.expectancy)}
        )`);

    circles
        .append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', d => rScale(d.population))
        .style('opacity', 0.5)
        .style('fill', 'steelblue');

    circles
        .append('text')
        .style('text-anchor', 'middle')
        .style('fill', 'black')
        .style('font-family', 'Operator Mono')
        .style('font-size', 14)
        .attr('y', d => 4)
        .text(d => d.code)

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