import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { AudioPlayerController } from "./components/AudioPlayer";
import { Player } from "tone";

const createPlayerController: () => AudioPlayerController = () =>
  new AudioPlayerController(new Player("heal-6.wav"));

ReactDOM.render(<App playerController={createPlayerController()} />, document.querySelector("#root"));
