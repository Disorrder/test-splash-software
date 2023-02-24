import { useState } from "react";
import { Box, Stack } from "@mui/material";

import styles from "./StatsContainer.module.scss";
import { ModalSx } from "~/utils/Modal.sx";
import { Tab, Tabs } from "../mui/Tabs";
import Records from "./Records";
import Players from "./Players";
import Chat from "./Chat";

export default function StatsContainer() {
  const [tab, setTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Stack sx={{ ...ModalSx, height: "100%", overflow: "hidden" }}>
      <Tabs value={tab} onChange={handleChange}>
        <Tab label="Records" />
        <Tab label="Players list" />
        <Tab label="Chat" />
      </Tabs>
      <Box sx={{ flex: "1", px: "13px", py: "20px", overflow: "hidden" }}>
        {tab === 0 && <Records />}
        {tab === 1 && <Players />}
        {tab === 2 && <Chat />}
      </Box>
    </Stack>
  );
}
