import { useState } from "react";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import NoChatSelected from "./NoChatSelected";

const ChatContainer = ({ selectedUser }) => {
  const [messages, setMessages] = useState({
    Neetu: ["Hello, how can I help you?", "Please provide details."],
    Aarav: ["Hi Aarav!", "We'll get back to you soon."],
    Priya: ["Welcome, Priya!", "Feel free to ask anything."],
    Rohan: ["Hi Rohan!", "How are you today?"],
  });

  // State to store what the user is currently typing
  const [draftMessage, setDraftMessage] = useState("");

  const handleSend = (newMessage) => {
    if (!selectedUser) return;

    setMessages((prev) => ({
      ...prev,
      [selectedUser.name]: [...(prev[selectedUser.name] || []), newMessage],
    }));
    setDraftMessage(""); // clear typing preview
  };

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader user={selectedUser} />

      <div className="flex-1 p-4 space-y-2 overflow-y-auto">
        {selectedUser ? (
          <>
            {messages[selectedUser.name]?.map((msg, index) => (
              <div
                key={index}
                className="bg-base-300 p-3 rounded-lg max-w-md text-sm"
              >
                {msg}
              </div>
            ))}

            {/* Show typing message in real-time */}
            {draftMessage && (
              <div className="bg-blue-100 p-3 rounded-lg max-w-md text-sm italic text-gray-600">
                {draftMessage}
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-500">
            <NoChatSelected />
          </p>
        )}
      </div>

      {/* Pass draft setter to MessageInput */}
      <MessageInput
        onSend={handleSend}
        onTyping={setDraftMessage} // will update live
        draftValue={draftMessage}
      />
    </div>
  );
};

export default ChatContainer;
