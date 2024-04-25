import React from 'react';
import './FeatureSection.css';
import coffeeImage from '../../media/coffee.png';
import robotImage from '../../media/robot.png';
import moneyImage from '../../media/money.png';

function FeatureSection() {
  return (
    <section className="feature-section">
      <div className="feature">
        <div className="feature-image" style={{ backgroundImage: `url(${coffeeImage})` }}></div>
        <h2>Nejlepší káva</h2>
        <p>Při její tvorbě využíváme umělou inteligenci.</p>
      </div>
      <div className="feature">
        <div className="feature-image" style={{ backgroundImage: `url(${robotImage})` }}></div>
        <h2>Nejlepší servis</h2>
        <p>V naší kavárně se setkáte s naším robo-servírkou.</p>
      </div>
      <div className="feature">
        <div className="feature-image" style={{ backgroundImage: `url(${moneyImage})` }}></div>
        <h2>Nejlepší cena</h2>
        <p>Díky nízkým nákladům káva za tu nejlepší cenu.</p>
      </div>
    </section>
  );
}

export default FeatureSection;
