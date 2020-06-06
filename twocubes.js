!function(t){var e={};function i(s){if(e[s])return e[s].exports;var n=e[s]={i:s,l:!1,exports:{}};return t[s].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(s,n,function(e){return t[e]}.bind(null,n));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=1)}([function(t,e,i){},function(t,e,i){"use strict";i.r(e);class s{constructor(t){this.cube=t}init(){}deinit(){}}function n(t,e,i,s=0,n=1){return(t-e)/(i-e)*(n-s)+s}function h(t,e=0,i=1){return Math.min(Math.max(t,e),i)}class o{constructor(t,e){if(this.el=t,this.images=e,this.plugins=[],t.innerHTML=this.constructor.containerTemplate,this._viewport=this.el.querySelector(".vz-cube"),!this._viewport)throw new Error("Couldn't find viewport element.");if(this._pivot=this.el.querySelector(".vz-cube__pivot"),!this._pivot)throw new Error("Couldn't find pivot element.");!function(t,e){t.innerHTML=Object.keys(e).map(t=>`<div data-face="${t}" class="vz-cube__face" style="background-image: url(${e[t]})" ></div>`).join("\n")}(this._pivot,e),this.isAnimating=!1,this.isDragging=!1,this.isFrozen=!1,this.speed=.1,this.yaw=0,this.pitch=0,this.roll=0,this.init()}init(){this.plugins=Object.keys(this.constructor.plugins).reduce((t,e)=>{const i=new(0,this.constructor.plugins[e])(this);return i.init(),{...t,[e]:i}},{}),this.processAnimation=this.processAnimation.bind(this),this.refresh=this.refresh.bind(this),requestAnimationFrame(this.refresh)}deinit(){this.plugins.forEach(t=>{t.deinit()}),this.plugins=[]}processAnimation(){if(!this.isAnimating)return;const t=Date.now(),e=n(t,this._animationStartTime,this._animationEndTime,0,1);this.yaw=n(this._easing(e),0,1,this._animationStartPos.yaw,this._animationEndPos.yaw),this.pitch=n(this._easing(e),0,1,this._animationStartPos.pitch,this._animationEndPos.pitch),this._animationEndTime<=t&&(this.isAnimating=!1,this.yaw=this._animationEndPos.yaw,this.pitch=this._animationEndPos.pitch,"function"==typeof this._animationEndCallback&&requestAnimationFrame(t=>this._animationEndCallback.call(this)))}_normalize(){this.pitch=h(this.pitch,-70,70),this.yaw>180&&(this.yaw-=360),this.yaw<-180&&(this.yaw+=360),this.roll<-180&&(this.roll+=360)}refresh(t){this.processAnimation(),this._normalize();const e=getComputedStyle(this._viewport).perspective;this._pivot.style.transform=`translateZ(${e}) rotateZ(${this.roll}deg) rotateX(${this.pitch}deg) rotateY(${this.yaw}deg)`,requestAnimationFrame(this.refresh)}}o.plugins={pointerEvents:class extends s{init(){this.handleMouseDown=this.handleMouseDown.bind(this),this.handleMouseMove=this.handleMouseMove.bind(this),this.handleMouseUp=this.handleMouseUp.bind(this),this.handleTouchStart=this.handleTouchStart.bind(this),this.handleTouchMove=this.handleTouchMove.bind(this),this.handleTouchEnd=this.handleTouchEnd.bind(this),this.cube.el.addEventListener("mousedown",this.handleMouseDown),window.addEventListener("mousemove",this.handleMouseMove),window.addEventListener("mouseup",this.handleMouseUp),this.cube.el.addEventListener("touchstart",this.handleTouchStart),this.cube.el.addEventListener("touchmove",this.handleTouchMove),this.cube.el.addEventListener("touchend",this.handleTouchEnd),this.cube.el.addEventListener("touchcancel",this.handleTouchEnd)}deinit(){this.cube.el.removeEventListener("mousedown",this.handleMouseDown),window.removeEventListener("mousemove",this.handleMouseMove),window.removeEventListener("mouseup",this.handleMouseUp),this.cube.el.removeEventListener("touchstart",this.handleTouchStart),this.cube.el.removeEventListener("touchmove",this.handleTouchMove),this.cube.el.removeEventListener("touchend",this.handleTouchEnd),this.cube.el.removeEventListener("touchcancel",this.handleTouchEnd)}handleMouseDown(t){t.preventDefault(),this.cube.isDragging=!0,this.lastDragEvent=t}handleMouseMove(t){!this.cube.isDragging||this.cube.isAnimating||this.cube.isFrozen||(this.cube.yaw+=(this.lastDragEvent.pageX-t.pageX)*this.cube.speed,this.cube.pitch-=h((this.lastDragEvent.pageY-t.pageY)*this.cube.speed,-70,70),this.lastDragEvent=t)}handleMouseUp(t){this.cube.isDragging=!1}handleTouchStart(t){Math.abs(this.cube.pitch)<69&&t.preventDefault(),this.cube.isDragging=!0,this.lastDragEvent=t.touches[0]}handleTouchMove(t){Math.abs(this.cube.pitch)<69&&t.preventDefault(),!this.cube.isDragging||this.cube.isAnimating||this.cube.isFrozen||(this.cube.yaw+=(this.lastDragEvent.pageX-t.touches[0].pageX)*this.cube.speed,this.cube.pitch-=(this.lastDragEvent.pageY-t.touches[0].pageY)*this.cube.speed,this.lastDragEvent=t.touches[0])}handleTouchEnd(t){Math.abs(this.cube.pitch)<69&&t.preventDefault(),this.cube.isDragging=!1}}},o.containerTemplate='\n    <div class="vz-cube">\n        <div class="vz-cube__pivot">\n        </div>\n    </div>\n';i(0);var a=o,r=document.querySelector("#cube");if(!r)throw new Error("#cube element not found!");new a(r,{top:"images/cubes/01/top.jpg",bottom:"images/cubes/01/bottom.jpg",front:"images/cubes/01/front.jpg",back:"images/cubes/01/back.jpg",left:"images/cubes/01/left.jpg",right:"images/cubes/01/right.jpg"})}]);
//# sourceMappingURL=app.90ea7c4e.js.map