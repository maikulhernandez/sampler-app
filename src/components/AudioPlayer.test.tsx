import {AudioPlayer, HooksPlayerController} from "./AudioPlayer";
import { Player } from "tone";
import React, { useEffect } from "react";
import { render, screen } from "@testing-library/react";
jest.mock("tone", () => ({
  Player: jest.fn(),
}));

test("AudioPlayerController", () => {
  // GIVEN
  const player = new Player();
  player.start = jest.fn();
  const spy = jest.spyOn(player, "start");
  const TestHook = () => {
    const { onPlay } = HooksPlayerController({ player });
    useEffect(() => {
      onPlay();
    }, []);

    return <div></div>;
  };

  // WHEN
  render(<TestHook></TestHook>);

  // THEN
  expect(spy).toBeCalledTimes(1);
});

test('audio player shows stop when isPlaying true', () => {
  render(<AudioPlayer
      isPlaying={true}
  ></AudioPlayer>)
  screen.getByText('stop');
});

test('audio player shows stop when isPlaying false', () => {
  render(<AudioPlayer
      isPlaying={false}
  >
  </AudioPlayer>)
  screen.getByText('testEl');
});
