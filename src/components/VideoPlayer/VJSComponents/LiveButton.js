import videojs from 'video.js';

const Component = videojs.getComponent('Component');

class LiveButton extends Component {
  constructor(player, options) {
    super(player, options);

    this.addClass('vjs-live-button');
    this.el().innerHTML = 'ŽIVĚ'; // Příklad textu, který se zobrazí na tlačítku

    // Přidání posluchače událostí, pokud je to potřeba
    this.on('click', function() {
      console.log('Živě tlačítko bylo kliknuto');
      // Zde můžete implementovat logiku pro tlačítko
    });
  }
}

videojs.registerComponent('LiveButton', LiveButton);
export default LiveButton;
