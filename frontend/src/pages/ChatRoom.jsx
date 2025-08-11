import { useEffect, useRef, useState } from "react";
import ChatContainer from "../components/ChatContainer";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const ChatRoom = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const socketRef = useRef(null);

  // Fetch all users for sidebar
  const fetchUsers = async () => {
    const res = await axios.get(
      "http://Shikhars-MacBook-Pro.local:8100/chat/students/"
    );
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.close();
    }

    if (!selectedUser) {
      setMessages([]);
      return;
    }

    const roomName = selectedUser.general_room;
    const userType = selectedUser.userType || "student";
    const userId = selectedUser.userId || selectedUser.id;
    console.log("Connecting to room:", roomName);
    console.log("type:", userType);
    console.log("id", userId);

    // WebSocket URL
    const wsUrl = `ws://Shikhars-MacBook-Pro.local:8100/ws/chat/${roomName}/?userType=${userType}&userId=${userId}`;
    console.log("WebSocket URL:", wsUrl);

    // Open WebSocket connection
    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onopen = () => {
      console.log("WebSocket connected to", roomName);
    };

    socketRef.current.onmessage = (event) => {
      console.log("WebSocket message received:", event.data);
      const newMessage = JSON.parse(event.data);
      setMessages((prev) => [...prev, newMessage]);

      setUsers((prevUsers) => {
        if (prevUsers.find((u) => u.id === newMessage.sender_id))
          return prevUsers;
        return [
          ...prevUsers,
          {
            id: newMessage.sender_id,
            name: newMessage.sender_type + " " + newMessage.sender_id,
          },
        ];
      });
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket disconnected from", roomName);
    };

    socketRef.current.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    // Fetch messages history for this room
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://Shikhars-MacBook-Pro.local:8100/chat/messages/${roomName}/`
        );
        setMessages(res.data);
        console.log(`Messages fetched for room ${roomName}:`, res.data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
        setMessages([]);
      }
    };

    fetchMessages();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [selectedUser]);

  const sendMessage = (messageObj) => {
    console.log("Sending message:", messageObj);

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(messageObj));
    }
  };

  return (
    <div className="h-screen bg-base-200">
      <div className="flex h-full rounded-lg overflow-hidden">
        <Sidebar
          users={users}
          onSelectUser={setSelectedUser}
          selectedUser={selectedUser}
        />
        <ChatContainer
          selectedUser={selectedUser}
          messages={messages}
          onSend={sendMessage}
        />
      </div>
    </div>
  );
};

export default ChatRoom;
