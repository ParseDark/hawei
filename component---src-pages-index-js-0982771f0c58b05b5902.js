(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{RXBc:function(e,t,n){"use strict";n.r(t);n("91GP");var a=n("q1tI"),r=n.n(a),i=n("Zttt"),o=n("vOnD"),l=n("/MKj"),c=n("Wbzz"),d=n("BZiS"),m=n("+n12"),s=o.a.div.withConfig({displayName:"InterestingCard__Box",componentId:"sc-1aw27e8-0"})(["perspective:","px;"],(function(e){return e.perspective})),f=function(e){var t=e.children,n=e.perspective,i=Object(a.useRef)(null),o=Object(a.useRef)(null),l=function(e,t){var n=t.offsetLeft+t.offsetWidth/2,a=t.offsetTop+t.offsetHeight/2,r=(e.clientX-n)/n,i=(e.clientY-a)/a;t.style.transform="rotateX("+-10*i+"deg)rotateY("+10*r+"deg)"},c=function(e,t){t.style.transform=""};return Object(a.useEffect)((function(){var e=i.current,t=o.current;return e.onmousemove=function(e){l(e,t)},e.onmouseleave=function(e){c(0,t)},function(){e.onmousemove=null,e.onmouseleave=null}}),[c,l,i,o]),r.a.createElement(r.a.Fragment,null,r.a.createElement(s,{ref:i,perspective:n},r.a.createElement("div",{ref:o},t)))},u=o.a.div.withConfig({displayName:"ArticleCard__Container",componentId:"sc-1fujkj1-0"})(["background:#fff;border-radius:0.5rem;margin-bottom:1rem;"]),p=o.a.div.withConfig({displayName:"ArticleCard__ImageContainer",componentId:"sc-1fujkj1-1"})(["background:url(",") no-repeat center center;background-size:cover;height:15rem;border-radius:0.5rem 0.5rem 0 0;display:flex;justify-content:center;align-items:center;@media (max-width:800px){display:none;}"],(function(e){return e.banner})),g=o.a.div.withConfig({displayName:"ArticleCard__TextContainer",componentId:"sc-1fujkj1-2"})(["padding:0.5rem 2rem;display:flex;flex-flow:column nowrap;@media (max-width:800px){padding:0 1rem;}"]),h=o.a.div.withConfig({displayName:"ArticleCard__Title",componentId:"sc-1fujkj1-3"})(['font-size:1rem;line-height:2.5rem;position:relative;padding:1rem 0;cursor:pointer;::after{content:"";background:#decb4c;content:"";display:inline-block;width:2rem;height:0.1rem;position:absolute;bottom:0;left:0;margin-bottom:1rem;}:hover{text-decoration:underline;}']),v=o.a.div.withConfig({displayName:"ArticleCard__Description",componentId:"sc-1fujkj1-4"})(["font-size:0.8rem;overflow:hidden;flex:1;"]),w=o.a.div.withConfig({displayName:"ArticleCard__ArticleFooter",componentId:"sc-1fujkj1-5"})(["display:flex;padding:0 2rem 0.5rem 2rem;justify-content:space-between;align-items:center;@media (max-width:800px){padding:0 1rem 0 1rem;}"]),b=o.a.div.withConfig({displayName:"ArticleCard__Line",componentId:"sc-1fujkj1-6"})(["border-top:1px solid #ececec;"]),j=o.a.div.withConfig({displayName:"ArticleCard__DateText",componentId:"sc-1fujkj1-7"})(["color:#989b9d;padding:1rem 0;font-size:0.8rem;"]),y=o.a.div.withConfig({displayName:"ArticleCard__BanerTitle",componentId:"sc-1fujkj1-8"})(['flex-flow:column nowrap;font-family:"Oswald",sans-serif;color:#000;font-size:1.5rem;height:50%;min-width:60%;display:flex;justify-content:center;align-items:center;border:0.5rem double;border-color:rgba(255,255,255,0.8);margin:1rem;@media (max-width:800px){display:none;}']),x=o.a.div.withConfig({displayName:"ArticleCard__BannerText",componentId:"sc-1fujkj1-9"})(["padding:2rem;flex:1;display:flex;justify-content:center;align-items:center;background:rgba(255,255,255,0.8);width:100%;font-size:1rem;"]),C=function(e){var t=e.list;return r.a.createElement(r.a.Fragment,null,t.map((function(e){var t=e.node;return r.a.createElement(f,{perspective:2e3},r.a.createElement(u,null,r.a.createElement(c.a,{to:t.fields.slug},r.a.createElement(p,{banner:t.frontmatter.banner},r.a.createElement(y,null,r.a.createElement(x,null,t.frontmatter.title)))),r.a.createElement(g,null,r.a.createElement(c.a,{to:t.fields.slug},r.a.createElement(h,null,t.frontmatter.title)),r.a.createElement(v,null,t.excerpt)),r.a.createElement(w,null,r.a.createElement(b,null),r.a.createElement("div",{style:{flex:1}},r.a.createElement(j,null,t.frontmatter.date)),r.a.createElement(d.a,{color:Object(m.a)()},t.frontmatter.tag))))})))},_=n("Syei"),E=o.a.div.withConfig({displayName:"pages__ArticleContainer",componentId:"ifild7-0"})(["flex:1;width:100%;"]),k=o.a.div.withConfig({displayName:"pages__AuthorInfo",componentId:"ifild7-1"})(["@media (max-width:800px){display:none;}"]);t.default=Object(l.b)((function(e,t){return Object.assign({},t,{isDarkMode:e.app.isDarkMode,articles:e._allArticles.articles,authorInfo:e._siteMeta.authorInfo})}),null)((function(e){var t=e.isDarkMode,n=e.dispatch,a=e.articles;return console.log(t,n),r.a.createElement(r.a.Fragment,null,r.a.createElement(i.a,null,r.a.createElement(k,null,r.a.createElement(_.a,null)),r.a.createElement(E,null,r.a.createElement(C,{list:a}))))}))}}]);
//# sourceMappingURL=component---src-pages-index-js-0982771f0c58b05b5902.js.map