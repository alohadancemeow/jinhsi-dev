import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import swup from "@swup/astro";
import astroI18next from "astro-i18next";
import pagefind from "astro-pagefind";

import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { remarkReadingTime } from "./src/plugins/remark-reading-time.mjs";
// import { remarkTOC } from "./src/plugins/remark-toc.mjs";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: netlify(),

  integrations: [
    pagefind(),
    astroI18next(),
    tailwind(),
    swup({
      theme: false,
      containers: ["main", ".banner-inner", "#language-selector-dropdown"],
      smoothScrolling: true,
      progress: true,
      cache: true,
      preload: true,
      updateHead: true,
      updateBodyClass: false,
      // accessibility: true,
      globalInstance: true,
    }),
  ],

  markdown: {
    shikiConfig: {
      theme: "github-dark-default",
    },
    remarkPlugins: [remarkReadingTime, remarkMath], // remarkTOC disabled for now
    rehypePlugins: [
      rehypeSlug,
      rehypeKatex,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "prepend",
        },
      ],
    ],
  },

});