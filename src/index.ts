import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import "./style.css";

window.addEventListener("load", init, false);

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

function init() {
  // document.addEventListener("mousemove", handleMouseMove, false);
  window.addEventListener(
    "resize",
    () => {
      WIDTH = window.innerWidth;
      HEIGHT = window.innerHeight;

      renderer.setSize(WIDTH, HEIGHT);
      camera.aspect = WIDTH / HEIGHT;
      camera.updateProjectionMatrix();
    },
    false
  );

  // SCENE
  const scene = new THREE.Scene();

  // CAMERA
  const aspectRatio = window.innerWidth / window.innerHeight;
  const fieldOfView = 60;
  const nearPlane = 0.1;
  const farPlane = 1000;
  const camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );
  camera.position.z = 2;

  // RENDERER
  const canvas = document.querySelector<HTMLCanvasElement>("#c");
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // CONTROLS
  const orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.enableDamping = true;

  // CUBE
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshNormalMaterial();
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  const clock =  new THREE.Clock();
  const animate = () => {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();
    orbitControls.update();
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  };
  animate();
}
