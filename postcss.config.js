import autoprefixer from 'autoprefixer';
import { purgeCSSPlugin } from '@fullhuman/postcss-purgecss';


const purgecss = purgeCSSPlugin({
    content: ['./hugo_stats.json'],
    defaultExtractor: (content) => {
        const els = JSON.parse(content).htmlElements;
        return [...(els.tags || []), ...(els.classes || []), ...(els.ids || [])];
    },
    safelist: [],
});

/** @type {import("postcss").Config} */
export default {
    plugins: [
        autoprefixer,
        purgecss,
    ],
};
