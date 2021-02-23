import "normalize.css";
import "./index.css";
import { lerp } from "../utils/lerp";

window.addEventListener("load", init, false);

// Current position of mouse
interface CursorData {
  currX: number;
  currY: number;
  prevX: number;
  prevY: number;
  currHoverItem: HTMLDivElement;
  currNavItem: HTMLButtonElement;
}
const cursor: CursorData = {
  currX: -100,
  currY: -100,
  prevX: 0,
  prevY: 0,
  currHoverItem: undefined,
  currNavItem: undefined,
};

function init() {
  document.addEventListener("mousemove", (e) => {
    cursor.currX = e.clientX;
    cursor.currY = e.clientY;
  });

  // CURSOR
  const cursorItem = document.getElementById("cursor");
  // NAV ITEMS
  const navItems = document.querySelectorAll(".nav-item");
  const navLinks = document.querySelectorAll(".nav-link");
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
    cursorItem.style.display = "none";

    cursor.currHoverItem = hoverItem;
    cursor.currNavItem = e.currentTarget;
  };

  const handleMouseLeave = (e) => {
    const target = e.currentTarget as Element;
    const hoverItem = target.querySelector<HTMLDivElement>(".hover");
    const hoverImageWrapper = hoverItem.querySelector(".hover-image-wrapper");
    const hoverImage = hoverItem.querySelector(".hover-image");

    hoverItem.style.opacity = "0";
    cursorItem.style.display = "initial";

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

  navItems.forEach((item) => {
    item.addEventListener("mouseenter", handleMouseEnter);
    item.addEventListener("mouseleave", handleMouseLeave);
    item.addEventListener("focus", handleFocus);
    item.addEventListener("blur", handleBlur);
  });

  const animate = () => {
    requestAnimationFrame(animate);

    cursor.prevX = lerp(cursor.prevX, cursor.currX, 0.08);
    cursor.prevY = lerp(cursor.prevY, cursor.currY, 0.08);
    if (cursor.currHoverItem && cursor.currNavItem) {
      const boundingRect = cursor.currNavItem.getBoundingClientRect();
      cursor.currHoverItem.style.left = `${cursor.prevX}px`;
      const y = cursor.prevY - boundingRect.top;
      cursor.currHoverItem.style.top = `${y}px`;    
    }
    cursorItem.style.left = `${cursor.prevX}px`;
    cursorItem.style.top = `${cursor.prevY}px`;
  };
  animate();
}
