import Image from "next/image";
import { Box, Stack } from "@mui/material";

import { useChat } from "~/contexts/chat.context";

import styles from "./Chat.module.scss";
import { Button } from "../mui/Button";
import { useRef } from "react";

export default function Chat() {
  const { messages } = useChat();

  const scrollable = useRef<HTMLDivElement>(null);

  function scrollToBottom() {
    scrollable.current?.scrollTo({
      top: scrollable.current.scrollHeight,
      behavior: "smooth",
    });
  }

  scrollToBottom();

  return (
    <Stack className={styles.Chat}>
      <Box sx={{ flex: "1", overflow: "hidden" }}>
        <FancyBox>
          <div className={styles.chatBox} ref={scrollable}>
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
                  message.type === "notification" &&
                    message.notificationType === "gameOver" &&
                    styles._gameOver,
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
          </div>
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
