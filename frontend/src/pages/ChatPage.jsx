import { useChatState } from "../context/chatcontext";

const ChatPage = () => {
  const user = useChatState();
  console.log(user, "sdfdsf");
  return <div></div>;
};

export default ChatPage;
