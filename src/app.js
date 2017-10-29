import {select, selectAll} from 'd3-selection';

const title = select('.title'),
  titleLinks = title.selectAll('a'),
  actionLink = select('.action'),
  secondLink = selectAll('.title > a:nth-child(2)');

console.log(titleLinks.nodes());
console.log(actionLink.nodes());
console.log(secondLink.nodes());

const allLinks = selectAll(document.links);
console.log(allLinks.nodes());
console.log(allLinks.size());