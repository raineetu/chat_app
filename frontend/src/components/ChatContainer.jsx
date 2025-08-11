import { useEffect, useRef, useState } from "react";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import NoChatSelected from "./NoChatSelected";

const ChatContainer = ({ selectedUser, messages, onSend }) => {
  const [draftMessage, setDraftMessage] = useState("");
  const [localMessages, setLocalMessages] = useState([]);
  const scrollRef = useRef(null);

  const filteredBackendMessages = messages.filter(
    (msg) =>
      selectedUser &&
      (msg.sender_id === selectedUser.id || msg.receiver_id === selectedUser.id)
  );

  const filteredLocalMessages = localMessages.filter(
    (msg) =>
      selectedUser &&
      (msg.sender_id === selectedUser.id || msg.receiver_id === selectedUser.id)
  );

  const allMessages = [
    ...filteredBackendMessages,
    ...filteredLocalMessages,
  ].sort((a, b) => a.id - b.id);

  const currentUserId = 0;

  const handleSend = (text) => {
    console.log("handleSend called with:", text);

    if (!selectedUser || text.trim() === "") return;

    const newMessage = {
      id: Date.now(),
      sender_id: currentUserId,
      receiver_id: selectedUser.id,
      message: text,
    };

    onSend(newMessage);

    setLocalMessages((prev) => [...prev, newMessage]);
    setDraftMessage("");
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [selectedUser?.id, messages, localMessages]);

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader user={selectedUser} />

      <div ref={scrollRef} className="flex-1 p-4 space-y-2 overflow-y-auto">
        {selectedUser ? (
          <>
            {allMessages.length === 0 ? (
              <div className="text-center text-gray-500 mt-10">
                No messages yet
              </div>
            ) : (
              allMessages.map((msg) => {
                const isMe = msg.sender_id === currentUserId;
                return (
                  <div
                    key={msg.id}
                    className={`p-3 rounded-lg max-w-xs text-sm ${
                      isMe
                        ? "bg-blue-500 text-white ml-auto"
                        : "bg-base-300 text-black mr-auto"
                    }`}
                  >
                    {msg.message}
                  </div>
                );
              })
            )}

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

      <MessageInput
        onSend={handleSend}
        onTyping={setDraftMessage}
        draftValue={draftMessage}
      />
    </div>
  );
};

export default ChatContainer;
