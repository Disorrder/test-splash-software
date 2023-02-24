import styles from "./GameContainer.module.scss";
import ResourceBar from "../ResourceBar/ResourceBar";
import GameWidget from "./GameWidget";

export default function GameContainer() {
  return (
    <div className={styles.GameContainer}>
      <ResourceBar className={styles.resources} />
      <GameWidget />
    </div>
  );
}
