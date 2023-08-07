/*!
 * v-drag v3.0.9
 * by Nil Vila and contributors
 */
"use strict";function a(a,t){const n="x"===t?window.data.snapX:window.data.snapY;return Math.round(a/n)*n}function t(a,t,n="add"){a.forEach(a=>{document[n+"EventListener"](a,t,!1)})}function n(a,t,n){return`matrix(${a||"1, 0, 0, 1,"} ${t}, ${n})`}function o(a,t){a.dispatchEvent(new Event("v-drag-"+t))}function e(t,e){window.data.relativeX=window.data.mouseX*t,window.data.relativeY=window.data.mouseY*e,window.data.move.style.transform=n(window.data.matrix,window.data.matrixX+a(window.data.relativeX,"x"),window.data.matrixY+a(window.data.relativeY,"y")),o(window.data.move,"moving"),(window.getSelection?window.getSelection():document.selection).empty()}const d={x(){e(!0,!1)},y(){e(!1,!0)},all(){e(!0,!0)}};function i(){d[window.data.axis](window.data),window.data.posAnimation=requestAnimationFrame(i)}function s(){window.data.move.classList.add(window.data.class.move),window.data.posAnimation=requestAnimationFrame(i),t(["mousemove","touchmove"],s,"remove")}function w(a,t){let n=Number(window.getComputedStyle(window.data.move)[t].replace("px",""));if("none"!==a){const o=a.match(/[0-9.-]+/g);n+=Number(o[8-t.length])}return n}function l(a,t,n){window.data.move.style.transform=a,window.data.move.style.left=t,window.data.move.style.top=n}function c(a){a.preventDefault(),window.data.mouseX=(a.pageX||a.touches[0].pageX)-window.data.initialX,window.data.mouseY=(a.pageY||a.touches[0].pageY)-window.data.initialY,window.setTimeout(()=>{(a.clientY||a.touches[0].clientY)>.8*window.innerHeight&&(document.documentElement.scrollTop+=10),(a.clientY||a.touches[0].clientY)<.2*window.innerHeight&&(document.documentElement.scrollTop-=10),(a.clientX||a.touches[0].clientX)>.8*window.innerWidth&&(document.documentElement.scrollLeft+=10),(a.clientX||a.touches[0].clientX)<.2*window.innerWidth&&(document.documentElement.scrollLeft-=10)},100)}function r(a,e,d,i,r){r.preventDefault(),window.data.grab=a,window.data.move=e,window.data.axis=d,window.data.initialX=r.pageX||r.touches[0].pageX,window.data.initialY=r.pageY||r.touches[0].pageY,window.data.relativeX=0,window.data.relativeY=0,window.data.snapX=i.x,window.data.snapY=i.y;const u=window.getComputedStyle(window.data.move).transform;window.data.matrix="none"!==u&&u.match(/\d([^,]*,){4}/g);const m=w(u,"left"),v=w(u,"top");l(n(window.data.matrix,m,v),0,0),window.data.matrixX=m,window.data.matrixY=v,window.data.grab.classList.add(window.data.class.down),o(e,"down"),o(e,"start"),t(["mousemove","touchmove"],c),t(["mousemove","touchmove"],s)}function u(){window.data.grab&&window.data.move&&(cancelAnimationFrame(window.data.posAnimation),t(["mousemove","touchmove"],s,"remove"),l(window.data.matrix?n(window.data.matrix,0,0):"none",window.data.matrixX+a(window.data.relativeX,"x")+"px",window.data.matrixY+a(window.data.relativeY,"y")+"px"),window.data.grab.classList.remove(window.data.class.down),window.data.move.classList.remove(window.data.class.move),o(window.data.move,"end"),t(["mousemove","touchmove"],c,"remove"))}function m(a,t){const n="string"==typeof a?parseInt(a.replace(/px/g,""),10):a;return 0===n||Number.isNaN(n)||t&&void 0===n?1:n}function v(a){return!!["x","y","all"].includes(a)}function p(a,n){const e=n.value||{},d=e instanceof Object?e.handle:e,i=function(a){if("string"==typeof a){const t=a.split(",");return{x:m(t[0]),y:void 0!==m(t[1])?m(t[1]):m(t[0])}}return"number"==typeof a?{x:m(a),y:m(a)}:a instanceof Object&&(a.x||a.y)?{x:m(a.x)||1,y:m(a.y)||1}:Array.isArray(a)?{x:m(a[0])||1,y:void 0!==m(a[1])?m(a[1],!0):m(a[0],!0)}:{x:1,y:1}}(e.snap),s=[];let w;w=e instanceof Object&&e.axis&&v(e.axis)?e.axis:v(n.arg)?n.arg:"all",d instanceof HTMLElement?s.push(d):document.querySelectorAll(d).forEach(a=>{s.push(a)}),0!==s.length?(a.classList.add(window.data.class.usesHandle),s.forEach(t=>{t.classList.add(window.data.class.handle),t.onmousedown=n=>r(t,a,w,i,n),t.ontouchstart=n=>r(t,a,w,i,n)})):(a.onmousedown=t=>r(a,a,w,i,t),a.ontouchstart=t=>r(a,a,w,i,t)),a.classList.add(window.data.class.initial),o(a,"setup"),t(["mouseup","touchend"],u)}const h=(a,t)=>{p(a,t)},f=(a,t)=>{a.onmousedown=null,a.ontouchstart=null;const n="object"==typeof t.oldValue?t.oldValue.handle:t.oldValue;document.querySelectorAll(n).forEach(t=>{t.onmousedown=null,t.ontouchstart=null,t.classList.remove(window.data.class.handle),a.classList.remove(window.data.class.usesHandle)}),t.oldValue&&Object.keys(t.oldValue).forEach(t=>{o(a,"update-"+t)}),p(a,t)};var g={install(a,t){window.data={},window.data.class={initial:"drag-draggable",usesHandle:"drag-uses-handle",handle:"drag-handle",down:"drag-down",move:"drag-move"};let n=!0;if(t){if(t.eventClass){const a=t.eventClass;Object.keys(a).forEach(t=>{a[t]&&(window.data.class[t]=a[t])})}"boolean"==typeof t.removeTransition&&(n=t.removeTransition)}const o=document.createElement("style");o.innerHTML=`.${window.data.class.initial}{position:relative;}.${window.data.class.initial}:not(.${window.data.class.usesHandle}),.${window.data.class.handle}{cursor:move;cursor:grab;cursor:-webkit-grab;}.${window.data.class.handle}.${window.data.class.down},.${window.data.class.initial}:not(.${window.data.class.usesHandle}).${window.data.class.down}{z-index:999;cursor:grabbing;cursor:-webkit-grabbing;}`,o.innerHTML+=!0===n?`.${window.data.class.move}{transition:none;}`:"",document.body.appendChild(o),a.directive("drag",{mounted(a,t){h(a,t)},updated(a,t){f(a,t)},inserted(a,t){h(a,t)},update(a,t){f(a,t)}})}};module.exports=g;
