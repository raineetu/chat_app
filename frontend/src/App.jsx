import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ChatPage from "./pages/ChatPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  );
};

export default App;
