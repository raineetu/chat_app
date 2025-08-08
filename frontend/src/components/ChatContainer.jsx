import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";

const ChatContainer = () => {
  const { message, getMessage, isMessageLoading, selectedUser } =
    useChatStore();

  useEffect(() => {
    getMessage(selectedUser._id);
  }, [selectedUser._id, getMessage]);

  if (isMessageLoading) return <div>Message Loading...</div>;

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <p>messages...</p>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
