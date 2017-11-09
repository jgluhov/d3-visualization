import { select } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { axisLeft, axisBottom } from 'd3-axis';
import { timeMinute } from 'd3-time';
import { transition } from 'd3-transition';

import { json } from 'd3-request';

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


json('data/update-data.json', (err, data) => {
    const xScale = scaleBand()
        .paddingInner(0.2)
        .paddingOuter(0.1)
        .domain(data.map(d => d.name))
        .range([0, width]);

    const yScale = scaleLinear()
        .domain([0, 100])
        .range([height, 0]);

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

    function render (subject = 'math') {
        const t = transition()
            .duration(1000);

        const update = svg.selectAll('rect')
            .data(data.filter(d => d[subject]), d => d.name);

        update
            .exit()
            .attr('y', height)
            .attr('height', 0)
            .transition(t)
            .remove();

        update
            .transition(t)
            .delay(1000)
            .attr('y', d => yScale(d[subject]))
            .attr('height', d => height - yScale(d[subject]));

        update
            .enter()
            .append('rect')
            .attr('y', height)
            .attr('height', 0)
            .attr('x',  d => xScale(d.name))
            .attr('width', d => xScale.bandwidth())
            .transition(t)
            .delay(300)
            .attr('y', d => yScale(d[subject]))
            .attr('height', d => height - yScale(d[subject]))
            .attr('class', 'rect');
    }

    render();

    window.render = render;
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