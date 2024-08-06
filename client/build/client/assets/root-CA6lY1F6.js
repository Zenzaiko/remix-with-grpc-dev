import{d as x,e as p,r as i,j as e,O as y}from"./index-DRxsmueX.js";import{h as j,j as f,_ as S,M as w,L as g,S as k}from"./components-CzXVTnO_.js";/**
 * @remix-run/react v2.10.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let a="positions";function M({getKey:t,...l}){let{isSpaMode:c}=j(),o=x(),d=p();f({getKey:t,storageKey:a});let u=i.useMemo(()=>{if(!t)return null;let s=t(o,d);return s!==o.key?s:null},[]);if(c)return null;let h=((s,m)=>{if(!window.history.state||!window.history.state.key){let r=Math.random().toString(32).slice(2);window.history.replaceState({key:r},"")}try{let n=JSON.parse(sessionStorage.getItem(s)||"{}")[m||window.history.state.key];typeof n=="number"&&window.scrollTo(0,n)}catch(r){console.error(r),sessionStorage.removeItem(s)}}).toString();return i.createElement("script",S({},l,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${h})(${JSON.stringify(a)}, ${JSON.stringify(u)})`}}))}const v="/assets/tailwind-BKjW8l2Y.css",N=()=>[{rel:"stylesheet",href:v}];function R({children:t}){return e.jsxs("html",{lang:"ja",children:[e.jsxs("head",{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),e.jsx(w,{}),e.jsx(g,{})]}),e.jsxs("body",{children:[t,e.jsx(M,{}),e.jsx(k,{})]})]})}function _(){return e.jsx(e.Fragment,{children:e.jsx("div",{className:"font-mono",children:e.jsx("div",{id:"main",children:e.jsx(y,{})})})})}export{R as Layout,_ as default,N as links};
