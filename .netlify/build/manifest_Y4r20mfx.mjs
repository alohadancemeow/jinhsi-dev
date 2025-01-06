import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'es-module-lexer';
import { N as NOOP_MIDDLEWARE_HEADER, k as decodeKey } from './chunks/astro/server_CA8VuJEi.mjs';
import 'clsx';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///D:/Github/web.dev/Anime-projects/yukina-dev/","adapterName":"@astrojs/netlify","routes":[{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"archive/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/archive","isIndex":false,"type":"page","pattern":"^\\/archive\\/?$","segments":[[{"content":"archive","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/archive.astro","pathname":"/archive","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"en/about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/en/about","isIndex":false,"type":"page","pattern":"^\\/en\\/about\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/about.astro","pathname":"/en/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"en/archive/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/en/archive","isIndex":false,"type":"page","pattern":"^\\/en\\/archive\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"archive","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/archive.astro","pathname":"/en/archive","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"ja/about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/ja/about","isIndex":false,"type":"page","pattern":"^\\/ja\\/about\\/?$","segments":[[{"content":"ja","dynamic":false,"spread":false}],[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ja/about.astro","pathname":"/ja/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"ja/archive/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/ja/archive","isIndex":false,"type":"page","pattern":"^\\/ja\\/archive\\/?$","segments":[[{"content":"ja","dynamic":false,"spread":false}],[{"content":"archive","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ja/archive.astro","pathname":"/ja/archive","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"th/about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/th/about","isIndex":false,"type":"page","pattern":"^\\/th\\/about\\/?$","segments":[[{"content":"th","dynamic":false,"spread":false}],[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/th/about.astro","pathname":"/th/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"th/archive/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/th/archive","isIndex":false,"type":"page","pattern":"^\\/th\\/archive\\/?$","segments":[[{"content":"th","dynamic":false,"spread":false}],[{"content":"archive","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/th/archive.astro","pathname":"/th/archive","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["D:/Github/web.dev/Anime-projects/yukina-dev/src/components/PostCard.astro",{"propagation":"in-tree","containsHead":false}],["D:/Github/web.dev/Anime-projects/yukina-dev/src/pages/[...page].astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["D:/Github/web.dev/Anime-projects/yukina-dev/src/pages/en/[...page].astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/en/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["D:/Github/web.dev/Anime-projects/yukina-dev/src/pages/ja/[...page].astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/ja/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["D:/Github/web.dev/Anime-projects/yukina-dev/src/pages/th/[...page].astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/th/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["D:/Github/web.dev/Anime-projects/yukina-dev/src/pages/about.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/about@_@astro",{"propagation":"in-tree","containsHead":false}],["D:/Github/web.dev/Anime-projects/yukina-dev/src/pages/en/about.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/en/about@_@astro",{"propagation":"in-tree","containsHead":false}],["D:/Github/web.dev/Anime-projects/yukina-dev/src/pages/en/posts/[...slug].astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/en/posts/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["D:/Github/web.dev/Anime-projects/yukina-dev/src/pages/en/posts/[slug].astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/en/posts/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["D:/Github/web.dev/Anime-projects/yukina-dev/src/pages/ja/about.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/ja/about@_@astro",{"propagation":"in-tree","containsHead":false}],["D:/Github/web.dev/Anime-projects/yukina-dev/src/pages/ja/posts/[...slug].astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/ja/posts/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["D:/Github/web.dev/Anime-projects/yukina-dev/src/pages/ja/posts/[slug].astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/ja/posts/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["D:/Github/web.dev/Anime-projects/yukina-dev/src/pages/posts/[...slug].astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/posts/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["D:/Github/web.dev/Anime-projects/yukina-dev/src/pages/th/about.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/th/about@_@astro",{"propagation":"in-tree","containsHead":false}],["D:/Github/web.dev/Anime-projects/yukina-dev/src/pages/th/posts/[...slug].astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/th/posts/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["D:/Github/web.dev/Anime-projects/yukina-dev/src/utils/content.ts",{"propagation":"in-tree","containsHead":false}],["D:/Github/web.dev/Anime-projects/yukina-dev/src/components/SideBar.astro",{"propagation":"in-tree","containsHead":false}],["D:/Github/web.dev/Anime-projects/yukina-dev/src/layouts/MainLayout.astro",{"propagation":"in-tree","containsHead":false}],["D:/Github/web.dev/Anime-projects/yukina-dev/src/layouts/PostArchiveLayout.astro",{"propagation":"in-tree","containsHead":false}],["D:/Github/web.dev/Anime-projects/yukina-dev/src/pages/archive.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/archive@_@astro",{"propagation":"in-tree","containsHead":false}],["D:/Github/web.dev/Anime-projects/yukina-dev/src/pages/categories/[category].astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/categories/[category]@_@astro",{"propagation":"in-tree","containsHead":false}],["D:/Github/web.dev/Anime-projects/yukina-dev/src/pages/en/archive.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/en/archive@_@astro",{"propagation":"in-tree","containsHead":false}],["D:/Github/web.dev/Anime-projects/yukina-dev/src/pages/en/categories/[category].astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/en/categories/[category]@_@astro",{"propagation":"in-tree","containsHead":false}],["D:/Github/web.dev/Anime-projects/yukina-dev/src/pages/en/tags/[tag].astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/en/tags/[tag]@_@astro",{"propagation":"in-tree","containsHead":false}],["D:/Github/web.dev/Anime-projects/yukina-dev/src/pages/ja/archive.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/ja/archive@_@astro",{"propagation":"in-tree","containsHead":false}],["D:/Github/web.dev/Anime-projects/yukina-dev/src/pages/ja/categories/[category].astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/ja/categories/[category]@_@astro",{"propagation":"in-tree","containsHead":false}],["D:/Github/web.dev/Anime-projects/yukina-dev/src/pages/ja/tags/[tag].astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/ja/tags/[tag]@_@astro",{"propagation":"in-tree","containsHead":false}],["D:/Github/web.dev/Anime-projects/yukina-dev/src/pages/tags/[tag].astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/tags/[tag]@_@astro",{"propagation":"in-tree","containsHead":false}],["D:/Github/web.dev/Anime-projects/yukina-dev/src/pages/th/archive.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/th/archive@_@astro",{"propagation":"in-tree","containsHead":false}],["D:/Github/web.dev/Anime-projects/yukina-dev/src/pages/th/categories/[category].astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/th/categories/[category]@_@astro",{"propagation":"in-tree","containsHead":false}],["D:/Github/web.dev/Anime-projects/yukina-dev/src/pages/th/tags/[tag].astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/th/tags/[tag]@_@astro",{"propagation":"in-tree","containsHead":false}],["D:/Github/web.dev/Anime-projects/yukina-dev/src/layouts/PostLayout.astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/archive@_@astro":"pages/archive.astro.mjs","\u0000@astro-page:src/pages/categories/[category]@_@astro":"pages/categories/_category_.astro.mjs","\u0000@astro-page:src/pages/en/about@_@astro":"pages/en/about.astro.mjs","\u0000@astro-page:src/pages/en/archive@_@astro":"pages/en/archive.astro.mjs","\u0000@astro-page:src/pages/en/categories/[category]@_@astro":"pages/en/categories/_category_.astro.mjs","\u0000@astro-page:src/pages/en/posts/[slug]@_@astro":"pages/en/posts/_slug_.astro.mjs","\u0000@astro-page:src/pages/en/posts/[...slug]@_@astro":"pages/en/posts/_---slug_.astro.mjs","\u0000@astro-page:src/pages/en/tags/[tag]@_@astro":"pages/en/tags/_tag_.astro.mjs","\u0000@astro-page:src/pages/en/[...page]@_@astro":"pages/en/_---page_.astro.mjs","\u0000@astro-page:src/pages/ja/about@_@astro":"pages/ja/about.astro.mjs","\u0000@astro-page:src/pages/ja/archive@_@astro":"pages/ja/archive.astro.mjs","\u0000@astro-page:src/pages/ja/categories/[category]@_@astro":"pages/ja/categories/_category_.astro.mjs","\u0000@astro-page:src/pages/ja/posts/[slug]@_@astro":"pages/ja/posts/_slug_.astro.mjs","\u0000@astro-page:src/pages/ja/posts/[...slug]@_@astro":"pages/ja/posts/_---slug_.astro.mjs","\u0000@astro-page:src/pages/ja/tags/[tag]@_@astro":"pages/ja/tags/_tag_.astro.mjs","\u0000@astro-page:src/pages/ja/[...page]@_@astro":"pages/ja/_---page_.astro.mjs","\u0000@astro-page:src/pages/posts/[...slug]@_@astro":"pages/posts/_---slug_.astro.mjs","\u0000@astro-page:src/pages/tags/[tag]@_@astro":"pages/tags/_tag_.astro.mjs","\u0000@astro-page:src/pages/th/about@_@astro":"pages/th/about.astro.mjs","\u0000@astro-page:src/pages/th/archive@_@astro":"pages/th/archive.astro.mjs","\u0000@astro-page:src/pages/th/categories/[category]@_@astro":"pages/th/categories/_category_.astro.mjs","\u0000@astro-page:src/pages/th/posts/[...slug]@_@astro":"pages/th/posts/_---slug_.astro.mjs","\u0000@astro-page:src/pages/th/tags/[tag]@_@astro":"pages/th/tags/_tag_.astro.mjs","\u0000@astro-page:src/pages/th/[...page]@_@astro":"pages/th/_---page_.astro.mjs","\u0000@astro-page:src/pages/[...page]@_@astro":"pages/_---page_.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_Y4r20mfx.mjs","D:\\Github\\web.dev\\Anime-projects\\yukina-dev\\.astro\\content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","D:\\Github\\web.dev\\Anime-projects\\yukina-dev\\.astro\\content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_Dlq19FCK.mjs","D:/Github/web.dev/Anime-projects/yukina-dev/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_C2SN-3ld.mjs","D:/Github/web.dev/Anime-projects/yukina-dev/src/components/Markdown.astro?astro&type=script&index=0&lang.ts":"_astro/Markdown.astro_astro_type_script_index_0_lang.D8ghAuGZ.js","D:/Github/web.dev/Anime-projects/yukina-dev/src/components/NavBar.astro?astro&type=script&index=0&lang.ts":"_astro/NavBar.astro_astro_type_script_index_0_lang.D-bkLW8T.js","D:/Github/web.dev/Anime-projects/yukina-dev/src/components/Banner.astro?astro&type=script&index=0&lang.ts":"_astro/Banner.astro_astro_type_script_index_0_lang.Cn5UMtt_.js","D:/Github/web.dev/Anime-projects/yukina-dev/node_modules/@swup/astro/dist/client/SwupPreloadPlugin.js":"_astro/SwupPreloadPlugin.CVIvv7Xf.js","D:/Github/web.dev/Anime-projects/yukina-dev/node_modules/@swup/astro/dist/client/SwupProgressPlugin.js":"_astro/SwupProgressPlugin.CxS15acw.js","D:/Github/web.dev/Anime-projects/yukina-dev/node_modules/@swup/astro/dist/client/SwupHeadPlugin.js":"_astro/SwupHeadPlugin.DgE0cn6v.js","D:/Github/web.dev/Anime-projects/yukina-dev/node_modules/@swup/astro/dist/client/SwupScriptsPlugin.js":"_astro/SwupScriptsPlugin.o5PkFIdr.js","D:/Github/web.dev/Anime-projects/yukina-dev/node_modules/astro-pagefind/src/components/Search.astro?astro&type=script&index=0&lang.ts":"_astro/Search.astro_astro_type_script_index_0_lang.Dtqgzho9.js","D:/Github/web.dev/Anime-projects/yukina-dev/node_modules/@swup/astro/dist/client/SwupScrollPlugin.js":"_astro/SwupScrollPlugin.CPHDirUY.js","D:/Github/web.dev/Anime-projects/yukina-dev/src/components/BaseHead.astro?astro&type=script&index=0&lang.ts":"_astro/BaseHead.astro_astro_type_script_index_0_lang.Cr6GY5aw.js","D:/Github/web.dev/Anime-projects/yukina-dev/src/components/ScriptSetup.astro?astro&type=script&index=0&lang.ts":"_astro/ScriptSetup.astro_astro_type_script_index_0_lang.B8-u9R8x.js","astro:scripts/page.js":"_astro/page.DSmErfl-.js","D:/Github/web.dev/Anime-projects/yukina-dev/node_modules/@swup/astro/dist/client/SwupA11yPlugin.js":"_astro/SwupA11yPlugin.BbekW4OE.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["D:/Github/web.dev/Anime-projects/yukina-dev/src/components/Markdown.astro?astro&type=script&index=0&lang.ts","const n=new MutationObserver(i);n.observe(document.body,{childList:!0,subtree:!0});document.addEventListener(\"DOMContentLoaded\",i);function i(){n.disconnect();let r=Array.from(document.querySelectorAll(\"pre\"));for(let e of r){if(e.parentElement?.nodeName===\"DIV\"&&e.parentElement?.classList.contains(\"code-block\"))continue;let o=document.createElement(\"div\");o.className=\"relative code-block\";let t=document.createElement(\"button\");t.className=\"copy-btn btn-regular-dark absolute active:scale-90 h-8 w-8 top-2 right-2 opacity-75 text-sm p-1.5 rounded-lg transition-all ease-in-out\",e.setAttribute(\"tabindex\",\"0\"),e.parentNode&&e.parentNode.insertBefore(o,e);let a='<svg class=\"copy-btn-icon copy-icon\" xmlns=\"http://www.w3.org/2000/svg\" height=\"20px\" viewBox=\"0 -960 960 960\" width=\"20px\"><path d=\"M368.37-237.37q-34.48 0-58.74-24.26-24.26-24.26-24.26-58.74v-474.26q0-34.48 24.26-58.74 24.26-24.26 58.74-24.26h378.26q34.48 0 58.74 24.26 24.26 24.26 24.26 58.74v474.26q0 34.48-24.26 58.74-24.26 24.26-58.74 24.26H368.37Zm0-83h378.26v-474.26H368.37v474.26Zm-155 238q-34.48 0-58.74-24.26-24.26-24.26-24.26-58.74v-515.76q0-17.45 11.96-29.48 11.97-12.02 29.33-12.02t29.54 12.02q12.17 12.03 12.17 29.48v515.76h419.76q17.45 0 29.48 11.96 12.02 11.97 12.02 29.33t-12.02 29.54q-12.03 12.17-29.48 12.17H213.37Zm155-238v-474.26 474.26Z\"/></svg>',d='<svg class=\"copy-btn-icon success-icon\" xmlns=\"http://www.w3.org/2000/svg\" height=\"20px\" viewBox=\"0 -960 960 960\" width=\"20px\"><path d=\"m389-377.13 294.7-294.7q12.58-12.67 29.52-12.67 16.93 0 29.61 12.67 12.67 12.68 12.67 29.53 0 16.86-12.28 29.14L419.07-288.41q-12.59 12.67-29.52 12.67-16.94 0-29.62-12.67L217.41-430.93q-12.67-12.68-12.79-29.45-.12-16.77 12.55-29.45 12.68-12.67 29.62-12.67 16.93 0 29.28 12.67L389-377.13Z\"/></svg>';t.innerHTML=`<div>${a} ${d}</div>\n      `,o.appendChild(e),o.appendChild(t);let c;t.addEventListener(\"click\",async()=>{c&&clearTimeout(c);let s=e?.querySelector(\"code\")?.innerText;s!==void 0&&(await navigator.clipboard.writeText(s),t.classList.add(\"success\"),c=setTimeout(()=>{t.classList.remove(\"success\")},1e3))})}n.observe(document.body,{childList:!0,subtree:!0})}"],["D:/Github/web.dev/Anime-projects/yukina-dev/src/components/NavBar.astro?astro&type=script&index=0&lang.ts","const o=document.getElementById(\"theme-switcher\"),n=document.getElementById(\"theme-icon\");let t=localStorage.getItem(\"theme\")||\"light\";const c=e=>{document.documentElement.setAttribute(\"data-theme\",e),localStorage.setItem(\"theme\",e),t=e,n.classList.remove(\"ic-sun\",\"ic-moon\"),n.classList.add(e===\"light\"?\"ic-sun\":\"ic-moon\"),document.documentElement.classList.toggle(\"dark\",e===\"dark\")};o.addEventListener(\"click\",()=>{c(t===\"light\"?\"dark\":\"light\")});document.addEventListener(\"DOMContentLoaded\",()=>{c(t)});"],["D:/Github/web.dev/Anime-projects/yukina-dev/src/components/Banner.astro?astro&type=script&index=0&lang.ts","const e=document.createElement(\"style\"),n=document.getElementById(\"carousel_imgs\"),t=n?.children.length??0,o=`\n  @keyframes carousel-animation {\n    0% {\n      opacity: 0;\n      transform: scale(1);\n    }\n    3% {\n      opacity: 1;\n    }\n    8% {\n      opacity: 1;\n      animation-timing-function: ease-out;\n    }\n    ${100/t}% {\n      opacity: 1;\n    }\n    ${100/t+50/t}% {\n      opacity: 0;\n      animation-timing-function: ease-out;\n    }\n    100% {\n      opacity: 0;\n      transform: scale(2);\n    }\n  }\n  `;e.textContent=o;document.getElementById(\"banner\")?.appendChild(e);"]],"assets":["/_astro/JetBrainsMono.CA-Os4ii.woff2","/_astro/_page_.Dd11HXad.css","/_astro/_page_.Bj8lmXhF.css","/_astro/archive.DHkSvsKB.css","/favicon.svg","/fonts/JetBrainsMono.woff2","/_astro/BaseHead.astro_astro_type_script_index_0_lang.Cr6GY5aw.js","/_astro/index.modern.CkIAsQri.js","/_astro/page.DSmErfl-.js","/_astro/preload-helper.CLcXU_4U.js","/_astro/ScriptSetup.astro_astro_type_script_index_0_lang.B8-u9R8x.js","/_astro/Search.astro_astro_type_script_index_0_lang.Dtqgzho9.js","/_astro/Swup.T76dPaas.js","/_astro/SwupA11yPlugin.BbekW4OE.js","/_astro/SwupHeadPlugin.DgE0cn6v.js","/_astro/SwupPreloadPlugin.CVIvv7Xf.js","/_astro/SwupProgressPlugin.CxS15acw.js","/_astro/SwupScriptsPlugin.o5PkFIdr.js","/_astro/SwupScrollPlugin.CPHDirUY.js","/locales/ja/translation.json","/locales/en/translation.json","/locales/th/translation.json","/locales/zh/translation.json","/_astro/page.DSmErfl-.js","/about/index.html","/archive/index.html","/en/about/index.html","/en/archive/index.html","/ja/about/index.html","/ja/archive/index.html","/th/about/index.html","/th/archive/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"/M7oRkB1IX2+lUxyXgOvLsYz9N5y6uXDHairNTlrMnU="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
