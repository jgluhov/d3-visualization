import {
  scaleLinear,
  scaleTime
} from 'd3-scale';

const linearScale = scaleLinear()
  .domain([0, 100])
  .range([- Math.PI / 6, 7 * Math.PI / 6])
  .clamp(true);

// console.log(linearScale(0));
// console.log(linearScale(50));
// console.log(linearScale(100));
//
// console.log(linearScale.invert(0));
// console.log(linearScale.invert(50));
// console.log(linearScale.invert(100));


const timeScale = scaleTime()
  .domain([new Date(2017, 0, 1), new Date()])
  .range([0, 100])
  .clamp(true);

// console.log(timeScale(new Date(2017, 0, 1)));
// console.log(timeScale(new Date(2017, 5, 14)));
// console.log(timeScale(new Date()));
//
// console.log(timeScale.invert(50));
