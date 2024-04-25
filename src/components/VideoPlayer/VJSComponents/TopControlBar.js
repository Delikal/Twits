import videojs from 'video.js';

class TopControlBar extends videojs.getComponent('Component') {
  constructor(player, options) {
    super(player, options);
    this.controlPause = false;

    // Nastavení třídy pro styling
    this.addClass('vjs-top-control-bar');

    // Naslouchejte události pro zastavení videa
    player.on('pause', () => {
      // Pokud je video pauznuté tak odstraní class, která dělá control bar neviditelný
      this.removeClass('vjs-top-control-bar-not');
      this.controlPause = true;
    });

    // Naslouchejte události pro spuštění videa
    player.on('play', () => {
      // Pokud je video spuštěné tak přidá class, která schová control bar
      this.addClass('vjs-top-control-bar-not');
      this.controlPause = false;
    });

    // Pokud je user neaktivní a video není pauznuté pak schová control bar
    player.on('userinactive', () => {
      if (this.controlPause === false) {
        this.addClass('vjs-top-control-bar-not');
      } else {
        this.removeClass('vjs-top-control-bar-not');
      }
    });

    // Pokud je user aktivní pak zobrazí control bar
    player.on('useractive', () => {
      this.removeClass('vjs-top-control-bar-not');
    });
  }
}

export default TopControlBar;
