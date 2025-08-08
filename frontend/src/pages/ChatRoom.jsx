import { useEffect, useState, useRef } from "react";
import ChatContainer from "../components/ChatContainer";
import Sidebar from "../components/Sidebar";

export default function ChatRoom() {
  // Connection Form State
  const [roomName, setRoomName] = useState("");
  const [userType, setUserType] = useState("student");
  const [userId, setUserId] = useState("");
  const [connected, setConnected] = useState(false);

  // Chat State
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Handle "Connect"
  const connect = () => {
    if (!roomName.trim() || !userId.trim()) return;

    const url = `ws://192.168.1.13:8100/ws/chat/${roomName}/?userType=${userType}&userId=${userId}`;
    socketRef.current = new WebSocket(url);

    socketRef.current.onopen = () => setConnected(true);

    socketRef.current.onmessage = ({ data }) => {
      setMessages((msgs) => [...msgs, JSON.parse(data)]);
    };

    socketRef.current.onclose = () => setConnected(false);
  };

  // Send a Message
  const sendMessage = () => {
    if (!draft.trim() || !connected) return;
    socketRef.current.send(JSON.stringify({ message: draft }));
    setDraft("");
  };

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Cleanup on Unmount
  useEffect(() => () => socketRef.current?.close(), []);

  // Render Connect Form
  if (!connected) {
    return (
      <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Connect to Chat</h2>

        <label className="block mb-2">
          <span className="text-sm font-medium text-gray-700">Room Name</span>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className="mt-1 text-black block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </label>

        <label className="block mb-2">
          <span className="text-sm font-medium text-gray-700">User Type</span>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="mt-1 block text-black w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        <label className="block mb-4">
          <span className="text-sm font-medium text-gray-700">User ID</span>
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="mt-1 text-black block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </label>

        <button
          onClick={connect}
          disabled={!roomName || !userId}
          className="w-full py-2 px-4 bg-blue-600  font-semibold rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Connect
        </button>
      </div>
    );
  }

  // Render Chat UI
  return (
    <div className="h-screen bg-base-200">
      <div className="flex h-full rounded-lg overflow-hidden">
        <Sidebar />

        <ChatContainer />
      </div>
    </div>
  );
}
