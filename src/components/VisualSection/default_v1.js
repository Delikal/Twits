import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Data from '../../fakeData/data.json';
import './VisualSection.css';

function VisualSection() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    // Scéna, kamera a renderer
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 1, 1000);
    camera.position.z = 300;
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.enableRotate = true;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = Math.PI / 2;

    // Přidání podlahy
    const planeGeometry = new THREE.PlaneGeometry(500, 500);
    const planeMaterial = new THREE.MeshBasicMaterial({ color: "rgb(226, 220, 222)", side: THREE.DoubleSide });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = 0; // Otáčení pro zarovnání s osou X
    scene.add(plane);

    // Označení bodu [0, 0]
    const markerGeometry = new THREE.SphereGeometry(5, 32, 32);
    const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xf2f2ff });
    const marker = new THREE.Mesh(markerGeometry, markerMaterial);
    scene.add(marker);

    // Barvy podle zralosti
    const colors = {
      0: 0x00ff00, // Zelená pro zralost 0
      1: 0xffa500, // Oranžová pro zralost 1
      2: 0xff0000  // Červená pro zralost 2
    };

    // Vytvoření skupiny
    const group = new THREE.Group();

    // Inicializace hlavního Bounding Boxu
    const mainBbox = new THREE.Box3();
    const bboxCenter = new THREE.Vector3();
    const bboxSize = new THREE.Vector3();

    // Vytvoření krychlí
    Data.forEach(plant => {
      const geometry = new THREE.BoxGeometry(50, 50, 50);
      const color = colors[plant.zralost] || 0x00ff00; // Výchozí barva
      const material = new THREE.MeshBasicMaterial({ color: color });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.x = (plant.sloupec - 5) * 55;
      cube.position.y = (plant.radek - 5) * 55;
      cube.position.z = 30;
      scene.add(cube);

      // Přidání krychle do skupiny
      group.add(cube); 

      // Vytvoření Bounding Boxu
      const bbox = new THREE.Box3().setFromObject(cube);
      const bboxHelper = new THREE.Box3Helper(bbox, 0xff0000); // Červená barva pro obrys
      group.add(bboxHelper);

      // Aktualizace hlavního Bounding Boxu
      mainBbox.expandByObject(cube);
    });

    // Vytvoření a přidání Bounding Boxu pro celou skupinu
    const mainBboxHelper = new THREE.Box3Helper(mainBbox, 0xff0000); // Červená barva pro obrys
    group.add(mainBboxHelper);

    // Přidání skupiny do scény
    scene.add(group);

    // Získání středu a rozměrů hlavního Bounding Boxu
    mainBbox.getCenter(bboxCenter);
    mainBbox.getSize(bboxSize);

    // Vypsání souřadnic a rozměrů do konzole
    console.log("BBox Center:", bboxCenter);
    console.log("BBox Size:", bboxSize);
    group.position.x = -bboxCenter.x;
    group.position.y = -bboxCenter.y;

    // Výpočet nových hodnot pro ortografickou kameru
    const aspectRatio = width / height;
    const bboxMaxSize = Math.max(bboxSize.x, bboxSize.y, bboxSize.z);
    const cameraDistance = bboxMaxSize / 2 / Math.tan(Math.PI / 180 * camera.fov / 2); // Pro perspektivní kameru
    const zoomLevel = 0.8 / (bboxMaxSize / Math.min(width, height)); // Pro ortografickou kameru

    // Nastavení nových hodnot kamery
    camera.zoom = zoomLevel;
    camera.updateProjectionMatrix();


    // Animace
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Vyčištění při odpojení komponenty
    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section className="visual-section">
      <div className="visual-section__content" ref={mountRef}></div>
    </section>
  );
}

export default VisualSection;
