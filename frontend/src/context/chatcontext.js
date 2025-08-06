import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const chatcontext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (userInfo) {
      history.push("/");
    }
  }, [history]);

  return (
    <chatcontext.Provider value={{ user, setUser }}>
      {children}
    </chatcontext.Provider>
  );
};

export const useChatState = () => {
  return useContext(chatcontext);
};

export default ChatProvider;
