import "normalize.css";
import "../base.css";
import "../gallery.css";
import Cursor from "../../ts/Cursor";

window.addEventListener("load", init, false);

function init() {
  const cursor = new Cursor();
  cursor.bindDomElement();

  const animate = () => {
    requestAnimationFrame(animate);
    
    cursor.animate();
  }
  animate();
}