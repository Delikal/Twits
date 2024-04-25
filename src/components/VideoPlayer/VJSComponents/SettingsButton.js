import videojs from 'video.js';
import settingsIcon from '../../../media/settings.png';

class SettingsButton extends videojs.getComponent('Button') {
  constructor(player, options) {
    super(player, options);
    this.el().innerHTML = `<img src="${settingsIcon}" height="20" width="20" alt="Custom Icon">`;
    this.addClass('vjs-settings-button');
    this.controlText('Settings Button'); // Nastaví text pro přístupnost
    this.on('click', this.handleClick);
  }

  handleClick() {
    this.player().trigger('SettingsButtonClicked');
  }
}

export default SettingsButton;
