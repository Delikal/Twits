import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import SettingsButton from "./VJSComponents/SettingsButton";
import LiveButton from "./VJSComponents/LiveButton";
import TopControlBar from './VJSComponents/TopControlBar';
import SettingsPanel from "./SubComponents/SettingsPanel";
import "video.js/dist/video-js.css";
import "./VideoPlayer.css";


/* 

Barevná paleta: https://coolors.co/111827-f3f5f6-9032e5-fefefe

*/


const VideoPlayer = ({ videoUrl }) => {
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);
  const [panelPosition, setPanelPosition] = useState({ top: 0, left: 0 });
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const settingsPanelRef = useRef(null);

  const calculateSettingsPanelPosition = () => {
    const settingsButton = playerRef.current.el().querySelector('.vjs-settings-button');
    if (settingsButton) {
      const buttonRect = settingsButton.getBoundingClientRect();
      const panelRect = settingsPanelRef.current.getBoundingClientRect();
      setPanelPosition({
        top: window.scrollY + buttonRect.top - panelRect.height,
        left: window.scrollX + buttonRect.right - panelRect.width
      });
    }
  };  

  useEffect(() => {
    if (videoRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controlBar: {
          progressControl: false,
          remainingTimeDisplay: false,
        },
      });
      
      // Registrujeme jednotlivé komponenty
      videojs.registerComponent("SettingsButton", SettingsButton);
      videojs.registerComponent("LiveButton", LiveButton);
      videojs.registerComponent("TopControlBar", TopControlBar);

      let TopControlBarParent = playerRef.current.addChild("TopControlBar", {});

      // Přidání třídy 'vjs-user-inactive' k automatickému skrytí
      playerRef.current.addClass('vjs-user-inactive');

      TopControlBarParent.addChild("LiveButton", {});

      playerRef.current.ready(function () {
        this.getChild("controlBar").addChild("SettingsButton", {});
        this.on("SettingsButtonClicked", () => {
    setShowSettingsPanel(prevState => {
      if (!prevState) {
        calculateSettingsPanelPosition();
      }
      return !prevState;
    });
        });
      });

      return () => {
        if (playerRef.current) {
          playerRef.current.dispose();
        }
      };
    }
  }, []);

  const closeSettingsPanel = () => setShowSettingsPanel(false);

  return (
    <div className="video-player">
      <video ref={videoRef} className="video-js video-player__video" controls>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {showSettingsPanel && (
        <SettingsPanel 
          ref={settingsPanelRef}
          close={closeSettingsPanel}
          style={{
            position: 'absolute',
            top: `${panelPosition.top}px`,
            left: `${panelPosition.left}px`
          }}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
