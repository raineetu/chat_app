import { useEffect, useState } from "react";
import axios from "axios";

const ChatPage = () => {
  const [chat, setChat] = useState(null);

  const fetchChat = async () => {
    try {
      const { data } = await axios.get("/api/chat");
      setChat(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching chat:", error);
    }
  };

  useEffect(() => {
    fetchChat();
  }, []);

  if (!chat) {
    return <div>Loading chat...</div>;
  }

  return (
    <div>
      <h2>Chat Details</h2>
      <p>Name: {chat.message || "No name available"}</p>
    </div>
  );
};

export default ChatPage;
