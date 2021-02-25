import { lerp } from "../utils/lerp";

/**
 * To use this cursor:
 *  1. Initialise it as a new object
 *  2. Bind it to an element in the DOM, by calling bindDomElement()
 *  3. Call animate() on every frame to animate the cursor's movement
 *  4. When done with the cursor, remove it by calling destroy()
 */
export default class Cursor {
  private currX: number;
  private currY: number;
  private prevX: number;
  private prevY: number;
  cursorEl: HTMLElement;

  constructor() {
    this.currX = 0;
    this.currY = 0;
    this.prevX = 0;
    this.prevY = 0;
    this.cursorEl = null;
    
    document.addEventListener("mousemove", (e) => {
      this.currX = e.clientX;
      this.currY = e.clientY;
    });
  }

  getCurrX() {
    return this.currX;
  }

  getCurrY() {
    return this.currY;
  }

  getPrevX() {
    return this.prevX;
  }

  getPrevY() {
    return this.prevY;
  }

  /**
   * Creates a div in the DOM that will represent the cursor.
   * Only one cursor div can exist at a time
   */
  bindDomElement() {
    if (this.cursorEl) {
      return;
    }
    // Create cursor div with id of "cursor"
    this.cursorEl = document.createElement('div');
    document.body.appendChild(this.cursorEl);
    this.cursorEl.id = "cursor";
    // Style it
    this.cursorEl.style.position = "fixed";
    this.cursorEl.style.top = "-100px";
    this.cursorEl.style.left = "-100px";
    this.cursorEl.style.transform = "translate(-50%, -50%)";
    this.cursorEl.style.height = "3rem";
    this.cursorEl.style.width = "3rem";
    this.cursorEl.style.border = "1px solid black";
    this.cursorEl.style.borderRadius = "50%";
    this.cursorEl.style.pointerEvents = "none";
  }

  /**
   * Must be called on every frame in order to animate the
   * cursor's position. It is recommended to do so within
   * the built-in requestAnimationFrame() function
   */
  animate() {
    this.prevX = lerp(this.prevX, this.currX, 0.08);
    this.prevY = lerp(this.prevY, this.currY, 0.08);

    this.cursorEl.style.left = `${this.prevX}px`;
    this.cursorEl.style.top = `${this.prevY}px`;
  }

  /**
   * Destroys the cursor div within the DOM
   */
  destroy() {
    document.removeChild(this.cursorEl);
    this.cursorEl = null;
  }
}