import { Send } from "lucide-react";
import { useState } from "react";

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim() === "") return;
    onSend(text);
    setText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  return (
    <div className="flex items-center p-3 border-t border-gray-300 bg-white">
      <textarea
        className="flex-1 resize-none rounded-lg border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-blue-400"
        rows="1"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button
        onClick={handleSend}
        className="ml-2 flex items-center justify-center bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
};

export default MessageInput;
