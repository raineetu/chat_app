import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";

const ChatContainer = ({ selectedUser }) => {
  console.log(selectedUser, "contsiner clicked");
  const messages = {
    Neetu: ["Hello, how can I help you?", "Please provide details."],
    Aarav: ["Hi Aarav!", "We'll get back to you soon."],
    Priya: ["Welcome, Priya!", "Feel free to ask anything."],
    Rohan: ["Hi Rohan!", "How are you today?"],
  };

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader user={selectedUser} />
      <div className="flex-1 p-4 space-y-2 overflow-y-auto">
        {selectedUser ? (
          messages[selectedUser.name]?.map((msg, index) => (
            <div
              key={index}
              className="bg-base-300 p-3 rounded-lg max-w-md text-sm"
            >
              {msg}
            </div>
          ))
        ) : (
          <p className="text-gray-500">Please select a user to start chat.</p>
        )}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
