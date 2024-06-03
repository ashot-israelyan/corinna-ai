import { FC, PropsWithChildren } from "react";
import { onLoginUser } from "@/actions/auth";
import { ChatProvider } from "@/context/user-chat-context";

const OwnerLayout: FC<PropsWithChildren> = async ({ children }) => {
  const authenticated = await onLoginUser();
  if (!authenticated) return null;

  return (
    <ChatProvider>
      <div className="flex h-screen w-full">

      </div>
    </ChatProvider>
  );
};

export default OwnerLayout;
