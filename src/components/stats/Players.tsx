import { useState } from "react";
import Image from "next/image";
import { Avatar, Box, Button, IconButton, Stack, styled } from "@mui/material";

import styles from "./Players.module.scss";

interface IPlayer {
  name: string;
  avatar: string;
}

export default function Players() {
  const players: IPlayer[] = [
    { name: "Skylar Baptista", avatar: "/assets/avatars/1.png" },
    { name: "Wilson Rosser", avatar: "/assets/avatars/2.png" },
    { name: "Leo Aminoff", avatar: "/assets/avatars/3.png" },
    { name: "Livia Bator", avatar: "/assets/avatars/4.png" },
    { name: "Ahmad Dias", avatar: "/assets/avatars/5.png" },
    { name: "Brandon Dokidis", avatar: "/assets/avatars/6.png" },
  ];

  const [active, setActive] = useState<IPlayer | null>(null);

  function handleClick(player: IPlayer) {
    if (active === player) {
      setActive(null);
    } else {
      setActive(player);
    }
  }

  return (
    <Stack className={styles.Players}>
      <div className={styles.header}>
        <Box className={styles.title}>Players</Box>
        <Box className={styles.amount}>8/12</Box>
      </div>

      <div className={styles.settings}>
        <SettingsButton
          fullWidth
          startIcon={
            <Image src="/assets/icons/cog.svg" width={15} height={15} alt="" />
          }
        >
          Settings
        </SettingsButton>
      </div>

      <Stack className={styles.content}>
        {players.map((player) => (
          <Box
            className={[
              styles.player,
              player.name === active?.name && styles._active,
            ].join(" ")}
            key={player.name}
            onClick={() => handleClick(player)}
          >
            <Avatar className={styles.avatar} src={player.avatar} />
            <Box className={styles.name}>{player.name}</Box>
            <IconButton className={styles.menu}>
              <Image
                src="/assets/icons/more_horiz.svg"
                width={24}
                height={24}
                alt=""
              />
            </IconButton>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}

const SettingsButton = styled(Button)({
  color: "white",
  fontFamily: "Saira",
  fontWeight: "700",
  fontSize: "14px",
  lineHeight: "22px",
  textTransform: "none",

  background:
    "linear-gradient(180deg, #995AFF -7.69%, rgba(108, 58, 252, 0.91) 127.88%)",
  backgroundSize: "calc(100% + 8px) calc(100% + 8px)",
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
  borderRadius: "4px",
  border: "3px solid rgba(255, 255, 255, 0.2)",
  outline: "2px solid #000", // be careful with Safari

  // border-image not support border-radius, please stop using it
  // borderImage:
  //   "linear-gradient(90deg, #995AFF -22.86%, rgba(186, 155, 255, 0.954063) 52.56%, #8E53FA 126.43%) 3",
});
