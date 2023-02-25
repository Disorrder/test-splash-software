import { useCallback, useEffect, useRef, useState } from "react";

import { Game } from "~/game";

import styles from "./GameWidget.module.scss";

export default function GameWidget() {
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
        el.current?.appendChild(game.app.view);
      })
      .catch((err) => {
        setError(true);
        console.error(err);
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
