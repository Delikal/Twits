import React, { forwardRef } from 'react';

const SettingsPanel = forwardRef(({ close, style }, ref) => {
  return (
    <div ref={ref} className="settings-panel" style={style}>
      <h3>Nastavení</h3>
      {/* Zde můžete přidat různé možnosti nastavení */}
      {/* Například: */}
      <div className="settings-option">
        <label>Kvalita videa</label>
        <select>
          <option>1080p</option>
          <option>720p</option>
          <option>480p</option>
          {/* další možnosti kvality */}
        </select>
      </div>
      <div className="settings-option">
        <label>Rychlost přehrávání</label>
        <select>
          <option>1x</option>
          <option>1.5x</option>
          <option>2x</option>
          {/* další možnosti rychlosti */}
        </select>
      </div>
      {/* Další možnosti nastavení */}
      <button onClick={close}>Zavřít</button>
    </div>
  );
});

export default SettingsPanel;
