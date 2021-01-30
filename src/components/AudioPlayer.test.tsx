import { HooksPlayerController } from "./AudioPlayer";
import { Player } from "tone";
import { useEffect } from "react";
import { render } from "@testing-library/react";
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
