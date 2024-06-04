"use client";

import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

type ChatInitialValuesProps = {
  realtime: boolean;
  setRealtime: Dispatch<SetStateAction<boolean>>;
  chatRoom: string | undefined;
  setChatRoom: Dispatch<SetStateAction<string | undefined>>;
  chats: {
    message: string;
    id: string;
    role: "assistant" | "user" | null;
    createdAt: Date;
    seen: boolean;
  }[];
  setChats: Dispatch<
    SetStateAction<
      {
        message: string;
        id: string;
        role: "assistant" | "user" | null;
        createdAt: Date;
        seen: boolean;
      }[]
    >
  >;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const ChatInitialValues: ChatInitialValuesProps = {
  chatRoom: undefined,
  setChatRoom: () => undefined,
  chats: [],
  setChats: () => undefined,
  loading: false,
  setLoading: () => undefined,
  realtime: false,
  setRealtime: () => undefined,
};

const chatContext = createContext(ChatInitialValues);
const { Provider } = chatContext;

export const ChatProvider: FC<PropsWithChildren> = ({ children }) => {
  const [chats, setChats] = useState(ChatInitialValues.chats);
  const [loading, setLoading] = useState(ChatInitialValues.loading);
  const [chatRoom, setChatRoom] = useState(ChatInitialValues.chatRoom);
  const [realtime, setRealtime] = useState(ChatInitialValues.realtime);

  const values = {
    chats,
    setChats,
    loading,
    setLoading,
    chatRoom,
    setChatRoom,
    realtime,
    setRealtime,
  };

  return <Provider value={values}>{children}</Provider>;
};

export const useChatContext = () => {
  const state = useContext(chatContext);
  return state;
};
