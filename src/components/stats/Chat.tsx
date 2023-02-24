import Image from "next/image";
import { Box, Stack } from "@mui/material";

import styles from "./Chat.module.scss";
import { Button } from "../mui/Button";

interface IChatMessage {
  type: "message";
  name: string;
  text: string;
}

interface IChatNotification {
  type: "notification";
  notificationType: "join" | "gameStart" | "gameEnd";
  text: string;
}

type IMessage = IChatMessage | IChatNotification;

export default function Chat() {
  const messages: IMessage[] = [
    {
      type: "notification",
      notificationType: "join",
      text: "Nazanin Has Joind the Game",
    },
    {
      type: "message",
      name: "Skylar Baptosta",
      text: "how you doing mate",
    },
    {
      type: "message",
      name: "Wilson Rosser",
      text: "Not bad",
    },
    {
      type: "message",
      name: "Ahmad Dias",
      text: "did you win last round?",
    },
    {
      type: "message",
      name: "Skylar Baptosta",
      text: "yes, headed for 2:30",
    },
    {
      type: "message",
      name: "Wilson Rosser",
      text: "wow Cool!",
    },
    {
      type: "message",
      name: "Ahmad Dias",
      text: "I'm on 2:00",
    },
    {
      type: "notification",
      notificationType: "gameStart",
      text: "The Game Start in 6...",
    },
  ];

  return (
    <Stack className={styles.Chat}>
      <Box sx={{ flex: "1", overflow: "hidden" }}>
        <FancyBox>
          <Box className={styles.chatBox}>
            {messages.map((message, i) => (
              <Box
                className={[
                  styles.message,
                  message.type === "notification" &&
                    message.notificationType === "join" &&
                    styles._join,
                  message.type === "notification" &&
                    message.notificationType === "gameStart" &&
                    styles._gameStart,
                ].join(" ")}
                key={i}
              >
                {message.type === "message" && (
                  <span className={styles.name}>
                    {message.name}:&nbsp;&nbsp;
                  </span>
                )}

                <span className={styles.text}>{message.text}</span>
              </Box>
            ))}
          </Box>
        </FancyBox>
      </Box>

      <Box sx={{ flex: "0" }}>
        <FancyBox>
          <Box className={styles.inputBox}>
            <input
              className={styles.inputField}
              type="text"
              placeholder="Type..."
            />
            <Button className={styles.sendButton}>
              <Image
                src="/assets/icons/near_me.svg"
                width={20}
                height={20}
                alt=""
              />
            </Button>
          </Box>
        </FancyBox>
      </Box>
    </Stack>
  );
}

function FancyBox({ children }: any) {
  return (
    <Box className={styles.FancyBox}>
      <Box className={styles.inner}>{children}</Box>
    </Box>
  );
}
