(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"8mZW":function(e,t,n){"use strict";n.r(t),n.d(t,"query",(function(){return f}));var r=n("q1tI"),a=n.n(r),i=n("Zttt"),o=n("vOnD"),l=n("ERfW"),c=n("Syei"),d=o.a.div.withConfig({displayName:"allArticles__ArticleContainer",componentId:"sc-1ft72w2-0"})(["flex:1;margin-left:1rem;"]),m=o.a.div.withConfig({displayName:"allArticles__AuthorInfo",componentId:"sc-1ft72w2-1"})(["@media (max-width:800px){display:none;}"]);t.default=function(e){var t=e.data;return a.a.createElement(i.a,null,a.a.createElement(m,null,a.a.createElement(c.a,{data:t})),a.a.createElement(d,null,a.a.createElement(l.a,{list:t.allMarkdownRemark.edges})))};var f="4125838581"},ERfW:function(e,t,n){"use strict";var r=n("q1tI"),a=n.n(r),i=n("vOnD"),o=n("Wbzz"),l=i.a.div.withConfig({displayName:"InterestingCard__Box",componentId:"sc-1aw27e8-0"})(["perspective:","px;"],(function(e){return e.perspective})),c=function(e){var t=e.children,n=e.perspective,i=Object(r.useRef)(null),o=Object(r.useRef)(null),c=function(e,t){var n=t.offsetLeft+t.offsetWidth/2,r=t.offsetTop+t.offsetHeight/2,a=(e.clientX-n)/n,i=(e.clientY-r)/r;t.style.transform="rotateX("+-10*i+"deg)rotateY("+10*a+"deg)"},d=function(e,t){t.style.transform=""};return Object(r.useEffect)((function(){var e=i.current,t=o.current;return e.onmousemove=function(e){c(e,t)},e.onmouseleave=function(e){d(0,t)},function(){e.onmousemove=null,e.onmouseleave=null}}),[d,c,i,o]),a.a.createElement(a.a.Fragment,null,a.a.createElement(l,{ref:i,perspective:n},a.a.createElement("div",{ref:o},t)))},d=i.a.div.withConfig({displayName:"ArticleCard__Container",componentId:"sc-1fujkj1-0"})(["background:#fff;border-radius:.5rem;margin-bottom:1rem;"]),m=i.a.div.withConfig({displayName:"ArticleCard__ImageContainer",componentId:"sc-1fujkj1-1"})(["background:url(",") no-repeat center center;background-size:cover;height:15rem;border-radius:.5rem .5rem 0 0;display:flex;justify-content:center;align-items:center;"],(function(e){return e.banner})),f=i.a.div.withConfig({displayName:"ArticleCard__TextContainer",componentId:"sc-1fujkj1-2"})(["padding:.5rem 2rem;display:flex;flex-flow:column nowrap;"]),s=i.a.div.withConfig({displayName:"ArticleCard__Title",componentId:"sc-1fujkj1-3"})(["font-size:1rem;line-height:2.5rem;position:relative;padding:1rem 0;cursor:pointer;::after{content:'';background:#decb4c;content:\"\";display:inline-block;width:2rem;height:.1rem;position:absolute;bottom:0;left:0;margin-bottom:1rem;}:hover{text-decoration:underline}"]),u=i.a.div.withConfig({displayName:"ArticleCard__Description",componentId:"sc-1fujkj1-4"})(["font-size:.8rem;overflow:hidden;flex:1;"]),p=i.a.div.withConfig({displayName:"ArticleCard__ArticleFooter",componentId:"sc-1fujkj1-5"})(["padding:0 2rem .5rem 2rem;"]),g=i.a.div.withConfig({displayName:"ArticleCard__Line",componentId:"sc-1fujkj1-6"})(["border-top:1px solid #ececec;"]),v=i.a.div.withConfig({displayName:"ArticleCard__DateText",componentId:"sc-1fujkj1-7"})(["color:#989b9d;padding:1rem 0;font-size:.8rem;"]),w=i.a.div.withConfig({displayName:"ArticleCard__BanerTitle",componentId:"sc-1fujkj1-8"})(["flex-flow:column nowrap;font-family:'Oswald',sans-serif;color:#000;font-size:1.5rem;height:50%;min-width:60%;display:flex;justify-content:center;align-items:center;border:.5rem double;border-color:rgba(255,255,255,.8);margin:1rem;@media (max-width:800px){display:none;}"]),h=i.a.div.withConfig({displayName:"ArticleCard__BannerText",componentId:"sc-1fujkj1-9"})(["padding:2rem;flex:1;display:flex;justify-content:center;align-items:center;background:rgba(255,255,255,.8);width:100%;font-size:1rem;"]);t.a=function(e){var t=e.list;return a.a.createElement(a.a.Fragment,null,t.map((function(e){var t=e.node;return a.a.createElement(c,{perspective:2e3},a.a.createElement(d,null,a.a.createElement(o.a,{to:t.fields.slug},a.a.createElement(m,{banner:t.frontmatter.banner},a.a.createElement(w,null,a.a.createElement(h,null,t.frontmatter.title)))),a.a.createElement(f,null,a.a.createElement(o.a,{to:t.fields.slug},a.a.createElement(s,null,t.frontmatter.title)),a.a.createElement(u,null,t.excerpt)),a.a.createElement(p,null,a.a.createElement(g,null),a.a.createElement(v,null,t.frontmatter.date))))})))}}}]);
//# sourceMappingURL=component---src-pages-all-articles-js-7fe3fea683c8ecf0be8a.js.map