import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
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
    camera.position.z = 500;
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
    // ... Kód pro přidání podlahy ...

    // Označení bodu [0, 0]
    // ... Kód pro přidání markeru ...

    // Barvy podle zralosti
    const colors = [0x00ff00, 0xffa500, 0xff0000]; // Zelená, Oranžová, Červená

    // Vytvoření skupiny
    const group = new THREE.Group();

    // Konfigurace pro generování čtverců
    const totalSquares = 36000; // Celkový počet čtverců
    const squareSize = 50; // Velikost čtverce
    const squaresPerRow = 200; // Počet čtverců na řádek
    const spacing = 52; // Mezera mezi čtverci

    // Vytvoření instancovaných mesh objektů pro každou barvu
    const instanceGeometry = new THREE.PlaneGeometry(squareSize, squareSize);
    const materials = colors.map(color => new THREE.MeshBasicMaterial({ color }));
    const meshes = materials.map(material => new THREE.InstancedMesh(instanceGeometry, material, totalSquares));

    // Generování čtverců
    for (let i = 0; i < totalSquares; i++) {
      const row = Math.floor(i / squaresPerRow);
      const col = i % squaresPerRow;
      const x = col * spacing - (squaresPerRow / 2) * spacing; // Centrování mřížky
      const y = row * spacing;
      const z = 0; // Všechny čtverce jsou v rovině Z = 0
      const position = new THREE.Vector3(x, y, z);
      const matrix = new THREE.Matrix4().makeTranslation(position.x, position.y, position.z);
      const mesh = meshes[Math.floor(Math.random() * meshes.length)];
      mesh.setMatrixAt(i, matrix);
    }

    // Přidání meshů do skupiny a scény
    meshes.forEach(mesh => {
      group.add(mesh);
      mesh.instanceMatrix.needsUpdate = true;
    });
    scene.add(group);

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
