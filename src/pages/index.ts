import "normalize.css";
import "./base.css";
import "./index.css";
import { lerp } from "../utils/lerp";
import Cursor from "../ts/Cursor";

window.addEventListener("load", init, false);

function init() {
  // CURSOR
  const cursor = new HomeCursor();
  cursor.bindDomElement();
  // NAV ITEMS
  const navItems = document.querySelectorAll(".nav-item");
  const navLinks = document.querySelectorAll(".nav-link");
  const navLinkMains = document.querySelectorAll(".nav-link-main");
  const navLinkSubs = document.querySelectorAll(".nav-link-sub");
  let imageUrls: string[] = [];
  navLinks.forEach((n) => {
    // Get image url of each nav link
    imageUrls.push(n.attributes["data-img"].value);
  });
  navItems.forEach((n, index) => {
    // Append hover div to nav item
    const hover = document.createElement("div");
    hover.className = "hover";
    const hoverImageWrapper = document.createElement("div");
    hoverImageWrapper.className = "hover-image-wrapper";
    const hoverImage = document.createElement("div");
    hoverImage.className = "hover-image";
    hoverImage.style.backgroundImage = `url(${imageUrls[index]})`;
    hoverImageWrapper.appendChild(hoverImage);
    hover.appendChild(hoverImageWrapper);
    n.appendChild(hover);
  });

  const handleMouseEnter = (e) => {
    const target = e.currentTarget as Element;
    const hoverItem = target.querySelector<HTMLDivElement>(".hover");

    hoverItem.style.opacity = "1";
    cursor.cursorEl.style.display = "none";

    cursor.currHoverItem = hoverItem;
    cursor.currNavItem = e.currentTarget;
  };

  const handleMouseLeave = (e) => {
    const target = e.currentTarget as Element;
    const hoverItem = target.querySelector<HTMLDivElement>(".hover");
    const hoverImageWrapper = hoverItem.querySelector(".hover-image-wrapper");
    const hoverImage = hoverItem.querySelector(".hover-image");

    hoverItem.style.opacity = "0";
    cursor.cursorEl.style.display = "initial";

    cursor.currHoverItem = undefined;
    cursor.currNavItem = undefined;
  };

  const handleFocus = (e) => {
    const target = e.currentTarget as Element;
    const hoverItem = target.querySelector<HTMLDivElement>(".hover");

    hoverItem.style.opacity = "1";
    hoverItem.style.top = `${hoverItem.offsetHeight / 2}px`;
    hoverItem.style.left = `${hoverItem.offsetWidth / 2}px`;
  };

  const handleBlur = (e) => {
    const target = e.currentTarget as Element;
    const hoverItem = target.querySelector<HTMLDivElement>(".hover");

    hoverItem.style.opacity = "0";
  };

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    navItems.forEach(n => {
      n.classList.add("hide");
    })
  }

  navItems.forEach((item) => {
    item.addEventListener("mouseenter", handleMouseEnter);
    item.addEventListener("mouseleave", handleMouseLeave);
    item.addEventListener("focus", handleFocus);
    item.addEventListener("blur", handleBlur);
    item.addEventListener("click", handleClick);
  });

  const animate = () => {
    requestAnimationFrame(animate);

    cursor.animate();
    if (cursor.currHoverItem && cursor.currNavItem) {
      const boundingRect = cursor.currNavItem.getBoundingClientRect();
      cursor.currHoverItem.style.left = `${cursor.getPrevX()}px`;
      const y = cursor.getPrevY() - boundingRect.top;
      cursor.currHoverItem.style.top = `${y}px`;    
    }
    cursor.cursorEl.style.left = `${cursor.getPrevX()}px`;
    cursor.cursorEl.style.top = `${cursor.getPrevY()}px`;
  };
  animate();
}

class HomeCursor extends Cursor {
  currHoverItem: HTMLElement;
  currNavItem: HTMLElement;

  constructor() {
    super();

    this.currHoverItem = undefined;
    this.currNavItem= undefined;
  }
}