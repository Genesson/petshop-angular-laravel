(window.webpackJsonp=window.webpackJsonp||[]).push([[108],{"5+Pq":function(e,t,o){"use strict";o.r(t),o.d(t,"iosTransitionAnimation",(function(){return m})),o.d(t,"shadow",(function(){return l})),o("c1op"),o("AfW+"),o("aiEM");var a=o("+4pY"),r=(o("kBU6"),o("K6rM"));const n=(e,t="top")=>`calc(${e}px + var(--ion-safe-area-${t}))`,s=e=>document.querySelector(`${e}.ion-cloned-element`),l=e=>e.shadowRoot||e,c=e=>e.querySelector("ion-header:not(.header-collapse-condense-inactive) ion-title[size=large]"),i=(e,t)=>{const o=e.querySelectorAll("ion-buttons");for(const a of o){const e=a.closest("ion-header"),o=e&&!e.classList.contains("header-collapse-condense-inactive"),r=a.querySelector("ion-back-button"),n=a.classList.contains("buttons-collapse");if(null!==r&&(n&&o&&t||!n))return r}return null},f=(e,t,o,r)=>{const l=r.getBoundingClientRect(),c=t?`calc(100% - ${l.right+4}px)`:`${l.left-4}px`,i=t?"7px":"-7px",f=t?"-4px":"4px",d=t?"-4px":"4px",m=t?"right":"left",y=t?"left":"right",p=[{offset:0,opacity:0,transform:`translate(${i}, ${n(8)}) scale(2.1)`},{offset:1,opacity:1,transform:`translate(${f}, ${n(-40)}) scale(1)`}],b=[{offset:0,opacity:1,transform:`translate(${f}, ${n(-40)}) scale(1)`},{offset:.6,opacity:0},{offset:1,opacity:0,transform:`translate(${i}, ${n(8)}) scale(2.1)`}],u=o?b:p,$=[{offset:0,opacity:0,transform:`translate3d(${d}, ${n(-35)}, 0) scale(0.6)`},{offset:1,opacity:1,transform:`translate3d(${d}, ${n(-40)}, 0) scale(1)`}],S=[{offset:0,opacity:1,transform:`translate(${d}, ${n(-40)}) scale(1)`},{offset:.2,opacity:0,transform:`translate(${d}, ${n(-35)}) scale(0.6)`},{offset:1,opacity:0,transform:`translate(${d}, ${n(-35)}) scale(0.6)`}],T=o?S:$,E=Object(a.a)(),g=Object(a.a)(),h=s("ion-back-button"),q=h.querySelector(".button-text"),A=h.querySelector("ion-icon");h.text=r.text,h.mode=r.mode,h.icon=r.icon,h.color=r.color,h.disabled=r.disabled,h.style.setProperty("display","block"),h.style.setProperty("position","fixed"),g.addElement(A),E.addElement(q),E.beforeStyles({"transform-origin":`${m} center`}).beforeAddWrite(()=>{r.style.setProperty("display","none"),h.style.setProperty(m,c)}).afterAddWrite(()=>{r.style.setProperty("display",""),h.style.setProperty("display","none"),h.style.removeProperty(m)}).keyframes(u),g.beforeStyles({"transform-origin":`${y} center`}).keyframes(T),e.addAnimation([E,g])},d=(e,t,o,r)=>{const l=r.getBoundingClientRect(),c=t?`calc(100% - ${l.right}px)`:`${l.left}px`,i=t?"-18px":"18px",f=t?"right":"left",d=[{offset:0,opacity:0,transform:`translate(${i}, ${n(0)}) scale(0.49)`},{offset:.1,opacity:0},{offset:1,opacity:1,transform:`translate(0, ${n(49)}) scale(1)`}],m=[{offset:0,opacity:.99,transform:`translate(0, ${n(49)}) scale(1)`},{offset:.6,opacity:0},{offset:1,opacity:0,transform:`translate(${i}, ${n(0)}) scale(0.5)`}],y=o?d:m,p=s("ion-title"),b=Object(a.a)();p.innerText=r.innerText,p.size=r.size,p.color=r.color,b.addElement(p),b.beforeStyles({"transform-origin":`${f} center`,height:"46px",display:"",position:"relative",[f]:c}).beforeAddWrite(()=>{r.style.setProperty("display","none")}).afterAddWrite(()=>{r.style.setProperty("display",""),p.style.setProperty("display","none")}).keyframes(y),e.addAnimation(b)},m=(e,t)=>{try{const o="cubic-bezier(0.32,0.72,0,1)",n="opacity",s="transform",m="0%",y=.8,p="rtl"===e.ownerDocument.dir,b=p?"-99.5%":"99.5%",u=p?"33%":"-33%",$=t.enteringEl,S=t.leavingEl,T="back"===t.direction,E=$.querySelector(":scope > ion-content"),g=$.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *"),h=$.querySelectorAll(":scope > ion-header > ion-toolbar"),q=Object(a.a)(),A=Object(a.a)();if(q.addElement($).duration(t.duration||540).easing(t.easing||o).fill("both").beforeRemoveClass("ion-page-invisible"),S&&e){const t=Object(a.a)();t.addElement(e),q.addAnimation(t)}if(E||0!==h.length||0!==g.length?(A.addElement(E),A.addElement(g)):A.addElement($.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs")),q.addAnimation(A),T?A.beforeClearStyles([n]).fromTo("transform",`translateX(${u})`,`translateX(${m})`).fromTo(n,y,1):A.beforeClearStyles([n]).fromTo("transform",`translateX(${b})`,`translateX(${m})`),E){const e=l(E).querySelector(".transition-effect");if(e){const t=e.querySelector(".transition-cover"),o=e.querySelector(".transition-shadow"),r=Object(a.a)(),s=Object(a.a)(),l=Object(a.a)();r.addElement(e).beforeStyles({opacity:"1"}).afterStyles({opacity:""}),s.addElement(t).beforeClearStyles([n]).fromTo(n,0,.1),l.addElement(o).beforeClearStyles([n]).fromTo(n,.03,.7),r.addAnimation([s,l]),A.addAnimation([r])}}const X=$.querySelector("ion-header.header-collapse-condense"),{forward:j,backward:O}=((e,t,o,a,r)=>{const n=i(a,o),s=c(r),l=c(a),m=i(r,o),y=null!==n&&null!==s&&!o,p=null!==l&&null!==m&&o;return y?(d(e,t,o,s),f(e,t,o,n)):p&&(d(e,t,o,l),f(e,t,o,m)),{forward:y,backward:p}})(q,p,T,$,S);if(h.forEach(e=>{const t=Object(a.a)();t.addElement(e),q.addAnimation(t);const o=Object(a.a)();o.addElement(e.querySelector("ion-title"));const r=Object(a.a)(),s=Array.from(e.querySelectorAll("ion-buttons,[menuToggle]")),c=e.closest("ion-header"),i=c&&c.classList.contains("header-collapse-condense-inactive");let f;f=s.filter(T?e=>{const t=e.classList.contains("buttons-collapse");return t&&!i||!t}:e=>!e.classList.contains("buttons-collapse")),r.addElement(f);const d=Object(a.a)();d.addElement(e.querySelectorAll(":scope > *:not(ion-title):not(ion-buttons):not([menuToggle])"));const y=Object(a.a)();y.addElement(l(e).querySelector(".toolbar-background"));const $=Object(a.a)(),S=e.querySelector("ion-back-button");if(S&&$.addElement(S),t.addAnimation([o,r,d,y,$]),r.fromTo(n,.01,1),d.fromTo(n,.01,1),T)i||o.fromTo("transform",`translateX(${u})`,`translateX(${m})`).fromTo(n,.01,1),d.fromTo("transform",`translateX(${u})`,`translateX(${m})`),$.fromTo(n,.01,1);else if(X||o.fromTo("transform",`translateX(${b})`,`translateX(${m})`).fromTo(n,.01,1),d.fromTo("transform",`translateX(${b})`,`translateX(${m})`),y.beforeClearStyles([n]).fromTo(n,.01,1),j||$.fromTo(n,.01,1),S&&!j){const e=Object(a.a)();e.addElement(l(S).querySelector(".button-text")).fromTo("transform",p?"translateX(-100px)":"translateX(100px)","translateX(0px)"),t.addAnimation(e)}}),S){const e=Object(a.a)(),t=S.querySelector(":scope > ion-content");if(e.addElement(t),e.addElement(S.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *")),q.addAnimation(e),T){e.beforeClearStyles([n]).fromTo("transform",`translateX(${m})`,p?"translateX(-100%)":"translateX(100%)");const t=Object(r.b)(S);q.afterAddWrite(()=>{"normal"===q.getDirection()&&t.style.setProperty("display","none")})}else e.fromTo("transform",`translateX(${m})`,`translateX(${u})`).fromTo(n,1,y);if(t){const o=l(t).querySelector(".transition-effect");if(o){const t=o.querySelector(".transition-cover"),r=o.querySelector(".transition-shadow"),s=Object(a.a)(),l=Object(a.a)(),c=Object(a.a)();s.addElement(o).beforeStyles({opacity:"1"}).afterStyles({opacity:""}),l.addElement(t).beforeClearStyles([n]).fromTo(n,.1,0),c.addElement(r).beforeClearStyles([n]).fromTo(n,.7,.03),s.addAnimation([l,c]),e.addAnimation([s])}}S.querySelectorAll(":scope > ion-header > ion-toolbar").forEach(e=>{const t=Object(a.a)();t.addElement(e);const o=Object(a.a)();o.addElement(e.querySelector("ion-title"));const r=Object(a.a)(),c=e.querySelectorAll("ion-buttons,[menuToggle]"),i=e.closest("ion-header"),f=i&&i.classList.contains("header-collapse-condense-inactive"),d=Array.from(c).filter(e=>{const t=e.classList.contains("buttons-collapse");return t&&!f||!t});r.addElement(d);const y=Object(a.a)(),b=e.querySelectorAll(":scope > *:not(ion-title):not(ion-buttons):not([menuToggle])");b.length>0&&y.addElement(b);const $=Object(a.a)();$.addElement(l(e).querySelector(".toolbar-background"));const S=Object(a.a)(),E=e.querySelector("ion-back-button");if(E&&S.addElement(E),t.addAnimation([o,r,y,S,$]),q.addAnimation(t),S.fromTo(n,.99,0),r.fromTo(n,.99,0),y.fromTo(n,.99,0),T){if(f||o.fromTo("transform",`translateX(${m})`,p?"translateX(-100%)":"translateX(100%)").fromTo(n,.99,0),y.fromTo("transform",`translateX(${m})`,p?"translateX(-100%)":"translateX(100%)"),$.beforeClearStyles([n]).fromTo(n,1,.01),E&&!O){const e=Object(a.a)();e.addElement(l(E).querySelector(".button-text")).fromTo("transform",`translateX(${m})`,`translateX(${(p?-124:124)+"px"})`),t.addAnimation(e)}}else f||o.fromTo("transform",`translateX(${m})`,`translateX(${u})`).fromTo(n,.99,0).afterClearStyles([s,n]),y.fromTo("transform",`translateX(${m})`,`translateX(${u})`).afterClearStyles([s,n]),S.afterClearStyles([n]),o.afterClearStyles([n]),r.afterClearStyles([n])})}return q}catch(o){throw o}}}}]);