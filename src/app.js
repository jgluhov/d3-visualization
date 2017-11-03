import {select} from 'd3-selection';

const scores = [
  { name: '1', score: 1 },
  { name: '2', score: 2 },
  { name: '3', score: 3 },
  { name: '4', score: 4 },
  { name: '5', score: 5 },
  { name: '6', score: 6 }
];

const bar = select('.chart')
    .append('svg')
        .attr('width', 200)
        .attr('height', 300)
    .selectAll('g')
    .data(scores)
    .enter()
        .append('g')
        .attr('transform', (d, i) => `translate(0, ${i * 30})`);

bar.append('rect')
    .style('width', d => d.score * 30)
    .classed('bar', true);

bar.append('text')
    .attr('y', 20)
    .text(d => d.name)
    .classed('text', true);