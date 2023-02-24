import { Box, Button, Stack, styled } from "@mui/material";
import Image from "next/image";

import styles from "./Players.module.scss";

export default function Players() {
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
        <Box className={styles.player}></Box>
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
