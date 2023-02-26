import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { IMessage, NotificationType } from "~/types/chat.types";
import type { IUser } from "~/types/user.types";
import { useSocket } from "./socket.context";

interface IChatContext {
  users: IUser[];
  messages: IMessage[];
  notify: (notificationType: NotificationType, text: string) => void;
}

const ChatContext = createContext<IChatContext | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<IMessage[]>([...defaultMessages]);
  const [users, setUsers] = useState<IUser[]>([]);

  function notify(notificationType: NotificationType, text: string) {
    setMessages((messages) => [
      ...messages,
      {
        type: "notification",
        notificationType,
        text,
      },
    ]);
  }

  function addUser(user: IUser) {
    setUsers((users) => {
      const map = new Map();
      users.forEach((user) => map.set(user.name, user));
      if (map.has(user.name)) return users;

      console.log("add", user, users, map);
      return [...users, user];
    });
  }

  const { socket } = useSocket();

  function handlePlayers(newUsers: IUser[]) {
    newUsers.forEach((user) => {
      user.avatar = `https://i.pravatar.cc/150?u=${user.name}`;
    });

    setUsers(newUsers);
  }

  function handleNewChatJoin(user: IUser) {
    addUser({
      ...user,
      avatar: `https://i.pravatar.cc/150?u=${user.name}`,
    });
    notify("join", `${user.name} has joined the game`);
  }

  function handleNewChatMessage(message: string) {
    setMessages((messages) => [
      ...messages,
      {
        type: "message",
        name: "From Socket",
        text: message,
      },
    ]);
  }

  useEffect(() => {
    socket.on("players", handlePlayers);
    socket.on("newChat", handleNewChatMessage);
    socket.on("newChatJoin", handleNewChatJoin);
  }, [socket]);

  return (
    <ChatContext.Provider value={{ users, messages, notify }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext) as IChatContext;
}

const defaultMessages: IMessage[] = [
  {
    type: "notification",
    notificationType: "join",
    text: "Nazanin Has Joined the Game",
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
