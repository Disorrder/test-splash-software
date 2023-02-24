import { Stack } from "@mui/material";
import { stringifyPlace } from "~/utils";

import styles from "./Records.module.scss";

interface ILeaderboardItem {
  name: string;
  score: string;
  rank: number;
}

export default function Records() {
  const leaderboard: ILeaderboardItem[] = [
    { name: "Miracle Levin", score: "2:44", rank: 1 },
    { name: "Lindsey Bergson", score: "2:49", rank: 2 },
    { name: "Madelyn Levin", score: "2:54", rank: 3 },
    { name: "Leo Stanton", score: "3:22", rank: 4 },
    { name: "Martin George", score: "3:24", rank: 5 },
    { name: "Joe Smith", score: "3:30", rank: 6 },
    { name: "The Ghost Rider", score: "3:31", rank: 7 },
  ];

  return (
    <Stack className={styles.Records}>
      <div className={styles.header}>
        <Stack className={styles.myBest}>
          <div className={styles.score}>4:33</div>
          <div className={styles.title}>Your last record</div>
        </Stack>

        <Stack className={styles.position}>
          <div className={styles.score}># 144th</div>
          <div className={styles.title}>from 15k</div>
        </Stack>
      </div>

      <div className={styles.leaderboard}>
        {leaderboard.map((item) => (
          <div className={styles.row} key={item.rank}>
            <div className={styles.name}>{item.name}</div>
            <Stack
              className={[styles.cell, styles.score].join(" ")}
              justifyContent="center"
              alignItems="center"
              gap={0.5}
            >
              <div className={styles.title}>Record</div>
              <div className={styles.value}>{item.score}</div>
            </Stack>
            <Stack
              className={[styles.cell, styles.rank].join(" ")}
              justifyContent="center"
              alignItems="center"
              gap={0.5}
            >
              <div className={styles.title}>Rank</div>
              <div className={styles.value}>{stringifyPlace(item.rank)}</div>
            </Stack>
          </div>
        ))}
      </div>
    </Stack>
  );
}
