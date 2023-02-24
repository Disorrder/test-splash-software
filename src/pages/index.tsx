import { type NextPage } from "next";
import Head from "next/head";
import { Container, Stack } from "@mui/material";

import styles from "./index.module.scss";
import GameContainer from "~/components/game/GameContainer";
import StatsContainer from "~/components/stats/StatsContainer";
import { Box } from "@mui/system";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wrong Way Racer!</title>
        <meta
          name="description"
          content="Created by Aleksandr Azarov, special for Splash Software"
        />
        <link rel="icon" href="/favicon.ico" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Saira:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className={styles.main}>
        <Container fixed sx={{ height: "100%" }}>
          <div className={styles.layout}>
            <Box>
              <GameContainer />
            </Box>
            <Box sx={{ flex: "1", overflow: "hidden", minHeight: "300px" }}>
              <StatsContainer />
            </Box>
          </div>
        </Container>
      </main>
    </>
  );
};

export default Home;
