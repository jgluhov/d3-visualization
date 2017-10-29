import {select} from 'd3-selection';

const scores = [
  { name: 'Alice', score: 95 },
  { name: 'Mamba', score: 60 },
  { name: 'Triple', score: 31 },
  { name: 'Quarterback', score: 11 },
  { name: 'Houston', score: 77 },
  { name: 'Keats', score: 58 }
];

const alphabetize = (array) => {
  return array.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }

    if (a.name > b.name) {
      return 1;
    }

    return 0;
  })
};


select('.chart')
  .selectAll('div')
  .data(scores)
  .enter()
  .append('div')
  .style('height', d => d.score + 'px')
  .style('width', '50px')
  .classed('bar', true);

