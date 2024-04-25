import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function SceneSetup(width, height, mount) {
    // Scéna, kamera a renderer
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 1, 1000);
    camera.position.z = 500;
    camera.zoom = 0.15;
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.enableRotate = false;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = Math.PI / 2;

    return { scene, renderer, camera, controls };
}

export default SceneSetup;