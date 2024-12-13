import { createContext, useContext } from "react";

const ChatContext = createContext();

const ChatProvider = ({ Children }) => {
  const [Doctor, setPatient] = useState();

  return (
    <ChatContext.Provider value={{ patient, setPatient }}>
      {Children}
    </ChatContext.Provider>
  );
};
export const ChatState = () => {
  useContext(ChatContext);
};
export default ChatProvider;
