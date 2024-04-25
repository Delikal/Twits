import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import SceneSetup from "./ClientSettings"
import './VisualSection.css';

function VisualSection() {
  const mountRef = useRef(null);
  const zoomRef = useRef(0.15);
  const [currentZoom, setCurrentZoom] = useState(0.15);

  useEffect(() => {
    const mount = mountRef.current;
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    // Scéna, kamera a renderer
    const { scene, renderer, camera, controls } = SceneSetup(width, height, mount);

    
    // Animace
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);

      // Aktualizace referenční hodnoty zoom
      zoomRef.current = camera.zoom;
      setCurrentZoom(camera.zoom);
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
