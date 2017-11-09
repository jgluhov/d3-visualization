import { select, selectAll } from 'd3-selection';
import { transition } from 'd3-transition';
import { easeElasticInOut } from 'd3-ease';

function go() {
    const t = transition()
        .delay(1000)
        .duration(1000)
        .ease(easeElasticInOut);

    selectAll('.block')
        .transition(t)
        .style('width', '400px');

    select('.block--a')
        .transition(t)
        .style('background-color', 'orange');

    select('.block--b')
        .transition(t)
        .style('opacity', 0.5);
}

function configure(t, delay, duration) {
    return t.delay(delay).duration(duration);
}

function goNow() {
    selectAll('.block')
        .transition()
        .call(configure, 100, 1000)
        .style('height', '400px');
}

window.go = go;
window.goNow = goNow;