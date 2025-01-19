(function(n,e){typeof exports=="object"&&typeof module<"u"?e(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],e):(n=typeof globalThis<"u"?globalThis:n||self,e(n.VueMovingLight={},n.Vue))})(this,function(n,e){"use strict";const d={class:"light-head"},r={class:"light-fixture"},i=e.defineComponent({__name:"MovingLight",props:{position:{default:"top"},pan:{default:0},tilt:{default:0},color:{default:"#ffffff"},intensity:{default:1},beamWidth:{default:10},beamLength:{default:1e3},strobeSpeed:{default:0},goboPattern:{default:"none"},goboRotation:{default:0},prismEnabled:{type:Boolean,default:!1},prismFacets:{default:3},prismRotation:{default:0}},setup(l){const t=l,m=e.computed(()=>`mount-${t.position}`),p=e.computed(()=>{switch(t.position){case"left":return-90;case"right":return 90;case"bottom":return 180;default:return 0}}),f=e.computed(()=>(t.pan+p.value)%360),s=e.computed(()=>{let a=f.value,o=t.tilt;return Math.abs(o)>90&&(a+=180,o>90?o=180-o:o<-90&&(o=-180-o)),{pan:a,tilt:o}}),u=e.computed(()=>s.value.pan),g=e.computed(()=>s.value.tilt),b=e.computed(()=>({transform:`rotate(${u.value}deg)`})),y=e.computed(()=>({transform:`rotateX(${g.value}deg)`})),h=e.computed(()=>{const a=t.strobeSpeed>0?`opacity ${1e3/t.strobeSpeed}ms steps(2, jump-none) infinite`:"none";return{"--beam-color":t.color,"--beam-width":`${t.beamWidth}deg`,"--beam-length":`${t.beamLength}px`,opacity:t.intensity,animation:a}}),S=e.computed(()=>({display:t.goboPattern==="none"?"none":"block","--gobo-pattern":t.goboPattern,transform:`rotate(${t.goboRotation}deg)`})),_=e.computed(()=>({display:t.prismEnabled?"block":"none","--prism-facets":t.prismFacets,transform:`rotate(${t.prismRotation}deg)`}));return(a,o)=>(e.openBlock(),e.createElementBlock("div",{class:e.normalizeClass(["moving-light",m.value])},[e.createElementVNode("div",{class:"light-base",style:e.normalizeStyle(b.value)},[e.createElementVNode("div",d,[e.createElementVNode("div",{class:"light-yoke",style:e.normalizeStyle(y.value)},[e.createElementVNode("div",r,[e.createElementVNode("div",{class:"light-beam",style:e.normalizeStyle(h.value)},[e.createElementVNode("div",{class:"gobo-pattern",style:e.normalizeStyle(S.value)},null,4),e.createElementVNode("div",{class:"prism-effect",style:e.normalizeStyle(_.value)},null,4)],4)])],4)])],4)],2))}});MovingLight;const c={install:l=>{l.component("MovingLight",i)}};n.MovingLight=i,n.default=c,Object.defineProperties(n,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
