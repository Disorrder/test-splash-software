import styles from "./GameWidget.module.scss";

export default function GameWidget() {
  return (
    <div className={styles.GameWidget}>
      <div className={styles.canvas} />
    </div>
  );
}
