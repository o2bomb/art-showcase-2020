(()=>{"use strict";const e=(e,t,r)=>(1-r)*e+r*t;window.addEventListener("load",(function(){const e=new t;e.bindDomElement();const r=document.querySelectorAll(".nav-item"),s=document.querySelectorAll(".nav-link");document.querySelectorAll(".nav-link-main"),document.querySelectorAll(".nav-link-sub");let o=[];s.forEach((e=>{o.push(e.attributes["data-img"].value)})),r.forEach(((e,t)=>{const r=document.createElement("div");r.className="hover";const s=document.createElement("div");s.className="hover-image-wrapper";const c=document.createElement("div");c.className="hover-image",c.style.backgroundImage=`url(${o[t]})`,s.appendChild(c),r.appendChild(s),e.appendChild(r)}));const c=t=>{const r=t.currentTarget.querySelector(".hover");r.style.opacity="1",e.cursorEl.style.display="none",e.currHoverItem=r,e.currNavItem=t.currentTarget},l=t=>{const r=t.currentTarget.querySelector(".hover");r.querySelector(".hover-image-wrapper"),r.querySelector(".hover-image"),r.style.opacity="0",e.cursorEl.style.display="initial",e.currHoverItem=void 0,e.currNavItem=void 0},i=e=>{const t=e.currentTarget.querySelector(".hover");t.style.opacity="1",t.style.top=t.offsetHeight/2+"px",t.style.left=t.offsetWidth/2+"px"},n=e=>{e.currentTarget.querySelector(".hover").style.opacity="0"},u=e=>{e.preventDefault(),r.forEach((e=>{e.classList.add("hide")}))};r.forEach((e=>{e.addEventListener("mouseenter",c),e.addEventListener("mouseleave",l),e.addEventListener("focus",i),e.addEventListener("blur",n),e.addEventListener("click",u)}));const a=()=>{if(requestAnimationFrame(a),e.animate(),e.currHoverItem&&e.currNavItem){const t=e.currNavItem.getBoundingClientRect();e.currHoverItem.style.left=`${e.getPrevX()}px`;const r=e.getPrevY()-t.top;e.currHoverItem.style.top=`${r}px`}e.cursorEl.style.left=`${e.getPrevX()}px`,e.cursorEl.style.top=`${e.getPrevY()}px`};a()}),!1);class t extends class{constructor(){this.currX=0,this.currY=0,this.prevX=0,this.prevY=0,this.cursorEl=null,document.addEventListener("mousemove",(e=>{this.currX=e.clientX,this.currY=e.clientY}))}getCurrX(){return this.currX}getCurrY(){return this.currY}getPrevX(){return this.prevX}getPrevY(){return this.prevY}bindDomElement(){this.cursorEl||(this.cursorEl=document.createElement("div"),document.body.appendChild(this.cursorEl),this.cursorEl.id="cursor",this.cursorEl.style.position="fixed",this.cursorEl.style.top="-100px",this.cursorEl.style.left="-100px",this.cursorEl.style.transform="translate(-50%, -50%)",this.cursorEl.style.height="3rem",this.cursorEl.style.width="3rem",this.cursorEl.style.border="1px solid black",this.cursorEl.style.borderRadius="50%",this.cursorEl.style.pointerEvents="none")}animate(){this.prevX=e(this.prevX,this.currX,.08),this.prevY=e(this.prevY,this.currY,.08),this.cursorEl.style.left=`${this.prevX}px`,this.cursorEl.style.top=`${this.prevY}px`}destroy(){document.removeChild(this.cursorEl),this.cursorEl=null}}{constructor(){super(),this.currHoverItem=void 0,this.currNavItem=void 0}}})();