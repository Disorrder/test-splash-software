import { useCallback, useEffect, useRef, useState } from "react";
import { useChat } from "~/contexts/chat.context";

import { Game } from "~/game";
import { sleep } from "~/utils/async";

import styles from "./GameWidget.module.scss";

export default function GameWidget() {
  const { notify } = useChat();

  const el = useRef<HTMLDivElement>(null);
  const [game, setGame] = useState<Game>();
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);

  useEffect(() => {
    const game = Game.getInstance();
    setGame(game);

    game
      .load()
      .then(() => {
        setLoaded(true);
        el.current?.appendChild(game.app.view as HTMLCanvasElement);
        game.restart();
      })
      .catch((err) => {
        setError(true);
        console.error(err);
      });

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    game.ee.on("gameover", async () => {
      notify("gameOver", "Game over!");
      notify("gameStart", "Game Starts in 3...");
      await sleep(1000);
      notify("gameStart", "Game Starts in 2...");
      await sleep(1000);
      notify("gameStart", "Game Starts in 1...");
    });
  }, []);

  return (
    <div className={styles.GameWidget} ref={el}>
      <>
        {!isLoaded && !isError && (
          <div className={styles.loading}>Loading...</div>
        )}
        {isError && <div className={styles.error}>Error loading game</div>}
      </>
    </div>
  );
}
