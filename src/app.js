import {select, selectAll} from 'd3-selection';

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

const scaleBar = (selection, scale) => {
   selection.style('transform', `scaleX(${scale})`);
};

const fade = (selection, opacity) => {
    selection.style('fill-opacity', opacity);
};

const setFill = (selection, color) => {
    selection.style('fill', color);
};

bar.append('rect')
    .style('width', d => d.score * 30)
    .classed('bar', true)
    .on('mouseover', function(d, i, elements) {
        select(this)
            .call(scaleBar, 2);

        selectAll(elements)
            .filter(':not(:hover)')
            .call(fade, 0.5)
            .call(setFill, 'coral');
    })
    .on('mouseout', function(d, i, elements) {
        select(this)
            .call(scaleBar, 1);

        selectAll(elements)
            .call(fade, 1)
            .call(setFill, 'lightgreen');
    });

bar.append('text')
    .attr('y', 20)
    .text(d => d.name)
    .classed('text', true);