import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import SceneSetup from "./ClientSettings"
import './VisualSection.css';

function VisualSection() {
  const mountRef = useRef(null);

  const zoomRef = useRef(0.15); // Předpokládá se, že kamera je ortografická; pro perspektivní kameru použijte camera.fov
  const [showPlanes, setShowPlanes] = useState(true);
  const planesRef = useRef([]);

  const [currentZoom, setCurrentZoom] = useState(0.15);

  useEffect(() => {
    const mount = mountRef.current;
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    // Scéna, kamera a renderer
    const { scene, renderer, camera, controls } = SceneSetup(width, height, mount);

    // Barvy podle zralosti
    const colors = [0x00ff00, 0xffa500, 0xff0000]; // Zelená, Oranžová, Červená

    // Konfigurace pro generování čtverců
    const totalSquares = 3600; // Celkový počet čtverců
    const squareSize = 50; // Velikost čtverce
    const squaresPerRow = 60; // Počet čtverců na řádek
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
      scene.add(mesh);
      mesh.instanceMatrix.needsUpdate = true;
    });

    // Vytvoření celkového bounding boxu
    const totalBoundingBox = new THREE.Box3();

    meshes.forEach(mesh => {
      mesh.geometry.computeBoundingBox();
      mesh.instanceMatrix.needsUpdate = true;
      const matrix = new THREE.Matrix4();
      for (let i = 0; i < totalSquares; i++) {
        const instanceBoundingBox = new THREE.Box3().copy(mesh.geometry.boundingBox);
        mesh.getMatrixAt(i, matrix);
        instanceBoundingBox.applyMatrix4(matrix);
        totalBoundingBox.union(instanceBoundingBox);
      }
    });

    // Vytvoření vizuální reprezentace bounding boxu
    const helper = new THREE.Box3Helper(totalBoundingBox, 0xff0000); // Červený box
    scene.add(helper);

    // Získání rozměrů a středu původního bounding boxu
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    totalBoundingBox.getCenter(center);
    totalBoundingBox.getSize(size);

    const halfWidth = size.x / 2;
    const halfHeight = size.y / 2;

    // Vytvoření čtyř "pod" bounding boxů
    const boxes = [
      new THREE.Box3(
        new THREE.Vector3(center.x - halfWidth, center.y - halfHeight, center.z),
        new THREE.Vector3(center.x, center.y, center.z)
      ),
      new THREE.Box3(
        new THREE.Vector3(center.x, center.y - halfHeight, center.z),
        new THREE.Vector3(center.x + halfWidth, center.y, center.z)
      ),
      new THREE.Box3(
        new THREE.Vector3(center.x - halfWidth, center.y, center.z),
        new THREE.Vector3(center.x, center.y + halfHeight, center.z)
      ),
      new THREE.Box3(
        new THREE.Vector3(center.x, center.y, center.z),
        new THREE.Vector3(center.x + halfWidth, center.y + halfHeight, center.z)
      )
    ];

    // Vytvoření rovin z bounding boxů
    boxes.forEach((box, index) => {
      const size = new THREE.Vector3();
      box.getSize(size);
      
      // Vytvoření geometrie roviny
      const planeGeometry = new THREE.PlaneGeometry(size.x, size.y);
      const color = colors[Math.floor(Math.random() * colors.length)];
      const planeMaterial = new THREE.MeshBasicMaterial({ color: color });
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      // Nastavení pozice roviny
      const center = new THREE.Vector3();
      box.getCenter(center);
      plane.position.copy(center)
      planesRef.current.push(plane); // Uložení reference roviny
      // Přidání roviny do scény
      scene.add(plane);
    });


    // Animace
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);

      // Aktualizace referenční hodnoty zoom
      zoomRef.current = camera.zoom;
      setCurrentZoom(camera.zoom);
      // Kontrola pro změnu viditelnosti rovin
      if (camera.zoom > 0.55 && showPlanes) {
        setShowPlanes(false);
        planesRef.current.forEach(plane => plane.visible = false);
      } else if (camera.zoom <= 0.55) {
        setShowPlanes(true);
        planesRef.current.forEach(plane => plane.visible = true);
      }
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
      <p>Aktuální Zoom Kamery: {currentZoom}</p>
    </section>
  );
}

export default VisualSection;
