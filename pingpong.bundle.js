(()=>{"use strict";const r=(r,e,t)=>(1-t)*r+t*e;window.addEventListener("load",(function(){const r=new e,t=document.createElement("a");t.href="/",r.bindDomElement(t);const s=document.querySelector(".heading"),o=document.querySelector(".feature-image"),n=e=>{const t=e.currentTarget;r.cursorEl.style.width="3rem",r.cursorEl.style.height="3rem",r.cursorEl.style.cursor="auto",r.cursorEl.style.backgroundColor="transparent",r.cursorEl.style.pointerEvents="none",r.cursorInnerEl.style.display="none",r.currFeatureImage=t},l=e=>{const t=e.currentTarget;r.cursorEl.style.width="6rem",r.cursorEl.style.height="6rem",r.cursorEl.style.cursor="pointer",r.cursorEl.style.backgroundColor="black",r.cursorEl.style.pointerEvents="auto",r.cursorInnerEl.style.display="initial",r.currFeatureImage=t};s.addEventListener("mouseenter",n),s.addEventListener("mouseleave",l),o.addEventListener("mouseenter",n),o.addEventListener("mouseleave",l);const i=()=>{requestAnimationFrame(i),r.animate()};i()}),!1);class e extends class{constructor(){this.currX=0,this.currY=0,this.prevX=0,this.prevY=0,this.cursorEl=null,document.addEventListener("mousemove",(r=>{this.currX=r.clientX,this.currY=r.clientY}))}getCurrX(){return this.currX}getCurrY(){return this.currY}getPrevX(){return this.prevX}getPrevY(){return this.prevY}bindDomElement(r){this.cursorEl||(this.cursorEl=r||document.createElement("div"),this.cursorEl.id="cursor",document.body.appendChild(this.cursorEl),this.cursorEl.style.position="fixed",this.cursorEl.style.top="-100px",this.cursorEl.style.left="-100px",this.cursorEl.style.transform="translate(-50%, -50%)",this.cursorEl.style.height="3rem",this.cursorEl.style.width="3rem",this.cursorEl.style.border="1px solid black",this.cursorEl.style.borderRadius="50%",this.cursorEl.style.pointerEvents="none")}animate(){this.prevX=r(this.prevX,this.currX,.08),this.prevY=r(this.prevY,this.currY,.08),this.cursorEl.style.left=`${this.prevX}px`,this.cursorEl.style.top=`${this.prevY}px`}destroy(){document.removeChild(this.cursorEl),this.cursorEl=null}}{constructor(){super(),this.currFeatureImage=void 0}bindDomElement(r){super.bindDomElement(r),this.cursorInnerEl=document.createElement("div"),this.cursorInnerEl.className="cursor-inner",this.cursorInnerEl.innerText="back",this.cursorInnerEl.style.position="absolute",this.cursorInnerEl.style.top="50%",this.cursorInnerEl.style.left="50%",this.cursorInnerEl.style.transform="translate(-50%, -50%)",this.cursorInnerEl.style.fontSize="2rem",this.cursorInnerEl.style.color="white",this.cursorInnerEl.style.pointerEvents="none",this.cursorEl.style.backgroundColor="black",this.cursorEl.style.width="6rem",this.cursorEl.style.height="6rem",this.cursorEl.style.cursor="pointer",this.cursorEl.style.pointerEvents="auto",this.cursorEl.style.transition="background-color .2s, width .2s, height .2s",this.cursorEl.appendChild(this.cursorInnerEl)}}window.addEventListener("load",(function(){}),!1)})();