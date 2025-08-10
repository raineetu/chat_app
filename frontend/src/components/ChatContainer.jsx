import { useEffect, useRef, useState } from "react";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import NoChatSelected from "./NoChatSelected";

const ChatContainer = ({ selectedUser }) => {
  const [messages, setMessages] = useState({
    Neetu: [
      { text: "Hello, how can I help you?", sender: "them" },
      { text: "Please provide details.", sender: "them" },
    ],
    Aarav: [
      { text: "Hi Aarav!", sender: "me" },
      { text: "We'll get back to you soon.", sender: "them" },
    ],
    Priya: [
      { text: "Welcome, Priya!", sender: "me" },
      { text: "Feel free to ask anything.", sender: "them" },
    ],
    Rohan: [
      { text: "Hi Rohan!", sender: "me" },
      { text: "How are you today?", sender: "them" },
    ],
  });

  const [draftMessage, setDraftMessage] = useState("");
  const scrollRef = useRef(null);

  const handleSend = (newMessage) => {
    if (!selectedUser) return;

    // Add your message (on the right)
    setMessages((prev) => ({
      ...prev,
      [selectedUser.name]: [
        ...(prev[selectedUser.name] || []),
        { text: newMessage, sender: "me" },
      ],
    }));
    setDraftMessage("");

    // Simulate friend reply after 1s
    setTimeout(() => {
      setMessages((prev) => ({
        ...prev,
        [selectedUser.name]: [
          ...(prev[selectedUser.name] || []),
          { text: "Got it! I'll reply shortly.", sender: "them" },
        ],
      }));
    }, 1000);
  };

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [selectedUser?.name, messages]);

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader user={selectedUser} />

      <div ref={scrollRef} className="flex-1 p-4 space-y-2 overflow-y-auto">
        {selectedUser ? (
          <>
            {messages[selectedUser.name]?.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg max-w-xs text-sm ${
                  msg.sender === "me"
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-base-300 text-black"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {/* Live typing preview */}
            {draftMessage && (
              <div className="bg-blue-100 p-3 rounded-lg max-w-xs text-sm italic text-gray-600 ml-auto">
                {draftMessage}
              </div>
            )}
          </>
        ) : (
          <div className="text-gray-500">
            <NoChatSelected />
          </div>
        )}
      </div>

      {/* Message input */}
      <MessageInput
        onSend={handleSend}
        onTyping={setDraftMessage}
        draftValue={draftMessage}
      />
    </div>
  );
};

export default ChatContainer;
