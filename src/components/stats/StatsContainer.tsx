import { useState } from "react";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";

import { ModalSx } from "~/utils/Modal.sx";
import { Tab, Tabs } from "../mui/Tabs";
import Records from "./Records";
import Players from "./Players";
import Chat from "./Chat";
import Grid from "@mui/system/Unstable_Grid";

export default function StatsContainer() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const [tab, setTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  if (isDesktop) {
    return (
      <Grid container spacing={3} height="100%">
        <Grid lg={4} height="100%">
          <Records />
        </Grid>
        <Grid lg={4} height="100%">
          <Chat />
        </Grid>
        <Grid lg={4} height="100%">
          <Players />
        </Grid>
      </Grid>
    );
  }

  /* Mobile layout */

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
