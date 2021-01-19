import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { AudioPlayerController } from "./components/AudioPlayer";
import { Player } from "tone";

ReactDOM.render(
  <App
    playerController={new AudioPlayerController(new Player("heal-6.wav"))}
  />,
  document.querySelector("#root")
);
