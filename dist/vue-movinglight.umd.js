(function(i,e){typeof exports=="object"&&typeof module<"u"?e(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],e):(i=typeof globalThis<"u"?globalThis:i||self,e(i.VueMovingLight={},i.Vue))})(this,function(i,e){"use strict";const d={class:"light-base"},c={class:"light-head"},p={class:"light-yoke"},f={class:"light-fixture"},r=["data-facets"],l=e.defineComponent({__name:"MovingLight",props:{position:{default:"top"},positionType:{default:"fixed"},pan:{default:0},tilt:{default:0},panSpeed:{default:90},tiltSpeed:{default:90},color:{default:"#ffffff"},intensity:{default:100},beamWidth:{default:10},beamLength:{default:1e3},prismEnabled:{type:Boolean,default:!1},prismFacets:{default:3},prismRotation:{default:0}},setup(n){const t=n,s=(o,a,h)=>`${Math.abs(a-o)/h}s`,u=e.computed(()=>{const o=s(0,t.pan,t.panSpeed),a=s(0,t.tilt,t.tiltSpeed);return{position:t.positionType,"--pan-angle":`${t.pan}deg`,"--tilt-angle":`${t.tilt}deg`,"--pan-duration":o,"--tilt-duration":a,"--beam-color":t.color,"--beam-width":t.beamWidth,"--beam-length":`${t.beamLength}px`,"--beam-intensity":t.intensity/100,"--prism-rotation":`${t.prismRotation}deg`}});return(o,a)=>(e.openBlock(),e.createElementBlock("div",{class:e.normalizeClass(["moving-light",`mount-${t.position}`]),style:e.normalizeStyle(u.value)},[e.createElementVNode("div",d,[e.createElementVNode("div",c,[e.createElementVNode("div",p,[e.createElementVNode("div",f,[e.createElementVNode("div",{class:e.normalizeClass(["light-beam",{"with-prism":t.prismEnabled}]),"data-facets":t.prismFacets},null,10,r)])])])])],6))}}),m={install:n=>{n.component("MovingLight",l),n.component("moving-light",l)}};i.MovingLight=l,i.default=m,Object.defineProperties(i,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
