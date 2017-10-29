import {select, selectAll} from 'd3-selection';

const title = select('.title'),
  titleLinks = title.selectAll('a'),
  actionLink = select('.action'),
  secondLink = selectAll('.title > a:nth-child(2)');

// console.log(titleLinks.nodes());
// console.log(actionLink.nodes());
// console.log(secondLink.nodes());

const allLinks = selectAll(document.links);
// console.log(allLinks.nodes());
// console.log(allLinks.size());

// secondLink.attr('href', 'http://google.com');

selectAll('.title > a:nth-child(2)')
  .attr('href', 'http://google.com');

selectAll('.title > a:nth-child(2)')
  .classed('red', true);

selectAll('.title > a:nth-child(2)')
  .text('Inventory');

selectAll('.title > a:nth-child(2)')
  .html('Inventory <b>SALE</b>');

select('.title')
  .append('div')
    .classed('red', true)
    .html('Inventory <b>SALE</b>')
  .append('button')
    .style('display', 'block')
    .text('submit');

select('.action').remove();