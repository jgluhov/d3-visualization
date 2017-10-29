import {scaleLinear} from 'd3-scale'
import {json} from 'd3-request';
import {min, max, extent} from 'd3-array';
import {set} from 'd3-collection'

json('data/data.json', (data) => {
  const minAge = min(data, (d) => d.age),
    maxAge = max(data, (d) => d.age),
    extentAge = extent(data, (d) => d.age);

  console.log('minAge', minAge);
  console.log('maxAge', maxAge);
  console.log('extentAge', extentAge);

  const scale = scaleLinear()
    .domain(extentAge)
    .range([0, 600]);

  console.log(scale(22));

  const ages = set(data, (d) => d.age);

  console.log(ages.values());
});

// csv('data/data.csv', (data) => {
//   console.log(data);
// });