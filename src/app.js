import { select } from 'd3-selection';
import 'd3-transition';
import { easeBounceOut, easeQuadOut } from 'd3-ease';

select('#block')
    .transition()
        .duration(1000)
        .delay(150)
        .ease(easeBounceOut)
        .style('width', '400px')
    .transition()
        .duration(1000)
        .ease(easeBounceOut)
        .style('height', '400px')
    .transition()
        .duration(1000)
        .ease(easeQuadOut)
        .style('background-color', 'yellow');
