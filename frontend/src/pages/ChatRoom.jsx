import { useEffect, useState, useRef } from "react";

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket(
      `ws://localhost:8100/ws/chat/neetu_1/?userType=student&userId=1`
    );

    socket.onopen = () => {
      console.log("✅ WebSocket connected");
    };

    socket.onerror = (err) => {
      console.error("❌ WebSocket error:", err);
    };

    socket.onclose = (e) => {
      console.warn("⚠️ WebSocket closed:", e.code, e.reason);
    };

    socket.onmessage = ({ data }) => {
      console.log("📩 Message received:", data);
      setMessages((msg) => [...msg, JSON.parse(data)]);
    };

    socketRef.current = socket;

    return () => socket.close();
  }, []);

  const send = () => {
    if (!draft.trim()) return;
    socketRef.current.send(JSON.stringify({ message: draft }));
    setDraft("");
  };

  return (
    <div>
      {/* <h3>Room: {roomName}</h3> */}
      <div
        style={{
          border: "1px solid #ccc",
          padding: 8,
          height: 300,
          overflowY: "scroll",
        }}
      >
        {messages.map((m, i) => (
          <p key={i}>
            <strong>
              {m.sender_type} {m.sender_id}:
            </strong>{" "}
            {m.message}
          </p>
        ))}
      </div>
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
        placeholder="Type..."
      />
      <button onClick={send}>Send</button>
    </div>
  );
}
