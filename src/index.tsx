import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { AudioPlayerControllerPt2 } from "./components/AudioPlayer";

ReactDOM.render(
  <App playerController2={AudioPlayerControllerPt2} />,
  document.querySelector("#root")
);
