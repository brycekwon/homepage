import autoprefixer from 'autoprefixer';
import { purgeCSSPlugin } from '@fullhuman/postcss-purgecss';


const purgecss = purgeCSSPlugin({
    content: ['./hugo_stats.json'],
    defaultExtractor: (content) => {
        const els = JSON.parse(content).htmlElements;
        return [...(els.tags || []), ...(els.classes || []), ...(els.ids || [])];
    },
    safelist: [
        'copy-code', 'code', 'chroma', 'x', 'err', 'cl', 'lnlinks', 'lntd', 'lntable', 'hl',
        'lnt', 'ln', 'line', 'k', 'kc', 'kd', 'kn', 'kp', 'kr', 'kt', 'n', 'na', 'nb', 'bp', 'nc',
        'no', 'nd', 'ni', 'ne', 'nf', 'fm', 'nl', 'nn', 'nx', 'py', 'nt', 'nv', 'vc', 'vg', 'vi',
        'vm', 'l', 'ld', 's', 'sa', 'sb', 'sc', 'dl', 'sd', 's2', 'se', 'sh', 'si', 'sx', 'sr',
        's1', 'ss', 'm', 'mb', 'mf', 'mh', 'mi', 'il', 'mo', 'o', 'ow', 'p', 'c', 'ch', 'cm',
        'c1', 'cs', 'cp', 'cpf', 'g', 'gd', 'ge', 'gr',  'gh', 'gi', 'go', 'gp', 'gs', 'gu', 'gt',
        'gl', 'w',
    ],
});

/** @type {import('postcss').Config} */
export default {
    plugins: [
        autoprefixer,
        purgecss,
    ],
};
