import "./base.css";
import "./gallery.css";
import Cursor from "../ts/Cursor";

window.addEventListener("load", init, false);

function init() {
  // CURSOR
  const cursor = new GalleryCursor();
  const cursorEl = document.createElement("a");
  cursorEl.href = "/";
  cursor.bindDomElement(cursorEl);

  const heading = document.querySelector(".heading");
  const featureImage = document.querySelector(".feature-image");

  const handleMouseEnter = (e: Event) => {
    const target = e.currentTarget as HTMLElement;

    cursor.cursorEl.style.width = "3rem";
    cursor.cursorEl.style.height = "3rem";
    cursor.cursorEl.style.cursor = "auto";
    cursor.cursorEl.style.backgroundColor = "transparent";
    cursor.cursorEl.style.pointerEvents = "none";
    cursor.cursorInnerEl.style.display = "none";

    cursor.currFeatureImage = target;
  };

  const handleMouseLeave = (e: Event) => {
    const target = e.currentTarget as HTMLElement;

    cursor.cursorEl.style.width = "6rem";
    cursor.cursorEl.style.height = "6rem";
    cursor.cursorEl.style.cursor = "pointer";
    cursor.cursorEl.style.backgroundColor = "black";
    cursor.cursorEl.style.pointerEvents = "auto";
    cursor.cursorInnerEl.style.display = "initial";

    cursor.currFeatureImage = target;
  };

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    featureImage.classList.add("hide");
    heading.classList.add("hide");
    cursor.cursorEl.style.width = "0";
    cursor.cursorEl.style.height = "0";

    // Redirect to destination
    const destination = (e.currentTarget as HTMLElement).getAttribute("href");
    setTimeout(() => {
      window.location.href = destination;
    }, 700);
  };

  heading.addEventListener("mouseenter", handleMouseEnter);
  heading.addEventListener("mouseleave", handleMouseLeave);
  featureImage.addEventListener("mouseenter", handleMouseEnter);
  featureImage.addEventListener("mouseleave", handleMouseLeave);
  cursor.cursorEl.addEventListener("click", handleClick);

  const animate = () => {
    requestAnimationFrame(animate);

    cursor.animate();
  };
  animate();
}

class GalleryCursor extends Cursor {
  currFeatureImage: HTMLElement;
  cursorInnerEl: HTMLElement;

  constructor() {
    super();

    this.currFeatureImage = undefined;
  }

  bindDomElement(inCursorEl?: HTMLElement) {
    super.bindDomElement(inCursorEl);
    this.cursorInnerEl = document.createElement("div");
    this.cursorInnerEl.className = "cursor-inner";
    this.cursorInnerEl.innerText = "back";
    this.cursorInnerEl.style.position = "absolute";
    this.cursorInnerEl.style.top = "50%";
    this.cursorInnerEl.style.left = "50%";
    this.cursorInnerEl.style.transform = "translate(-50%, -50%)";
    this.cursorInnerEl.style.fontSize = "2rem";
    this.cursorInnerEl.style.color = "white";
    this.cursorInnerEl.style.pointerEvents = "none";
    this.cursorEl.style.backgroundColor = "black";
    this.cursorEl.style.width = "6rem";
    this.cursorEl.style.height = "6rem";
    this.cursorEl.style.cursor = "pointer";
    this.cursorEl.style.pointerEvents = "auto";
    this.cursorEl.style.transition =
      "background-color .2s, width .2s, height .2s";
    this.cursorEl.appendChild(this.cursorInnerEl);
  }
}
