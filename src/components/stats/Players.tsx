import { useState } from "react";
import Image from "next/image";
import { Avatar, Box, IconButton, Stack } from "@mui/material";

import { IUser } from "~/types/user.types";
import { useChat } from "~/contexts/chat.context";

import styles from "./Players.module.scss";
import { Button } from "../mui/Button";

export default function Players() {
  const { users } = useChat();

  // const users: IUser[] = [
  //   { name: "Skylar Baptista", avatar: "/assets/avatars/1.png" },
  //   { name: "Wilson Rosser", avatar: "/assets/avatars/2.png" },
  //   { name: "Leo Aminoff", avatar: "/assets/avatars/3.png" },
  //   { name: "Livia Bator", avatar: "/assets/avatars/4.png" },
  //   { name: "Ahmad Dias", avatar: "/assets/avatars/5.png" },
  //   { name: "Brandon Dokidis", avatar: "/assets/avatars/6.png" },
  // ];

  const [active, setActive] = useState<IUser | null>(null);

  function handleClick(user: IUser) {
    if (active === user) {
      setActive(null);
    } else {
      setActive(user);
    }
  }

  return (
    <Stack className={styles.Players}>
      <div className={styles.header}>
        <Box className={styles.title}>Players</Box>
        <Box className={styles.amount}>8/12</Box>
      </div>

      <div className={styles.settings}>
        <Button
          fullWidth
          startIcon={
            <Image src="/assets/icons/cog.svg" width={15} height={15} alt="" />
          }
        >
          Settings
        </Button>
      </div>

      <Stack className={styles.content}>
        {users.map((user) => (
          <Box
            className={[
              styles.player,
              user.name === active?.name && styles._active,
            ].join(" ")}
            key={user.name}
            onClick={() => handleClick(user)}
          >
            <Avatar className={styles.avatar} src={user.avatar} />
            <Box className={styles.name}>{user.name}</Box>
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
