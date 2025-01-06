import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_Y4r20mfx.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map([
]);;

const _page0 = () => import('./pages/about.astro.mjs');
const _page1 = () => import('./pages/archive.astro.mjs');
const _page2 = () => import('./pages/categories/_category_.astro.mjs');
const _page3 = () => import('./pages/en/about.astro.mjs');
const _page4 = () => import('./pages/en/archive.astro.mjs');
const _page5 = () => import('./pages/en/categories/_category_.astro.mjs');
const _page6 = () => import('./pages/en/posts/_slug_.astro.mjs');
const _page7 = () => import('./pages/en/posts/_---slug_.astro.mjs');
const _page8 = () => import('./pages/en/tags/_tag_.astro.mjs');
const _page9 = () => import('./pages/en/_---page_.astro.mjs');
const _page10 = () => import('./pages/ja/about.astro.mjs');
const _page11 = () => import('./pages/ja/archive.astro.mjs');
const _page12 = () => import('./pages/ja/categories/_category_.astro.mjs');
const _page13 = () => import('./pages/ja/posts/_slug_.astro.mjs');
const _page14 = () => import('./pages/ja/posts/_---slug_.astro.mjs');
const _page15 = () => import('./pages/ja/tags/_tag_.astro.mjs');
const _page16 = () => import('./pages/ja/_---page_.astro.mjs');
const _page17 = () => import('./pages/posts/_---slug_.astro.mjs');
const _page18 = () => import('./pages/tags/_tag_.astro.mjs');
const _page19 = () => import('./pages/th/about.astro.mjs');
const _page20 = () => import('./pages/th/archive.astro.mjs');
const _page21 = () => import('./pages/th/categories/_category_.astro.mjs');
const _page22 = () => import('./pages/th/posts/_---slug_.astro.mjs');
const _page23 = () => import('./pages/th/tags/_tag_.astro.mjs');
const _page24 = () => import('./pages/th/_---page_.astro.mjs');
const _page25 = () => import('./pages/_---page_.astro.mjs');
const pageMap = new Map([
    ["src/pages/about.astro", _page0],
    ["src/pages/archive.astro", _page1],
    ["src/pages/categories/[category].astro", _page2],
    ["src/pages/en/about.astro", _page3],
    ["src/pages/en/archive.astro", _page4],
    ["src/pages/en/categories/[category].astro", _page5],
    ["src/pages/en/posts/[slug].astro", _page6],
    ["src/pages/en/posts/[...slug].astro", _page7],
    ["src/pages/en/tags/[tag].astro", _page8],
    ["src/pages/en/[...page].astro", _page9],
    ["src/pages/ja/about.astro", _page10],
    ["src/pages/ja/archive.astro", _page11],
    ["src/pages/ja/categories/[category].astro", _page12],
    ["src/pages/ja/posts/[slug].astro", _page13],
    ["src/pages/ja/posts/[...slug].astro", _page14],
    ["src/pages/ja/tags/[tag].astro", _page15],
    ["src/pages/ja/[...page].astro", _page16],
    ["src/pages/posts/[...slug].astro", _page17],
    ["src/pages/tags/[tag].astro", _page18],
    ["src/pages/th/about.astro", _page19],
    ["src/pages/th/archive.astro", _page20],
    ["src/pages/th/categories/[category].astro", _page21],
    ["src/pages/th/posts/[...slug].astro", _page22],
    ["src/pages/th/tags/[tag].astro", _page23],
    ["src/pages/th/[...page].astro", _page24],
    ["src/pages/[...page].astro", _page25]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "d0c3f7a0-9a8f-4804-aa0a-bff34c982dab"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
