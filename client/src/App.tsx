import { useEffect, useState } from "react";
import io from "socket.io-client";
import UsernameModal from "./components/UsernameModal";
import { ChatMessage } from "./types";
import Chat from "./components/Chat";

// Connect to Socket.IO server
const socket = io("http://10.0.0.43:5001"); // Replace with your server URL and port

function App() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([{ username: 'user1', timestamp: 1609459200, message: 'Hello World!' }]);

  useEffect(() => {
    setIsModalOpen(true); // Open the modal when the webpage loads

    socket.on('send_username', (username) => {
      console.log(username)
    });

    socket.on('send_message', (newMessage) => {
      setMessages(prevMessages => [...prevMessages, newMessage]);
    });
  }, [messages, setMessages]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const sendMessage = () => {
    const currentDate = new Date();
    const messageJson = {username: username, timestamp: currentDate.getTime(), message: message}
    console.log(username)
    socket.emit("send_message", messageJson);
    setMessage("");
  };

  const sendUsername = () => {
    console.log(username)
    socket.emit("send_username", username);
  };

  return (
    <div>
      <UsernameModal isOpen={isModalOpen} onClose={closeModal} onSave={sendUsername} username={username} setUsername={setUsername}/>
      <Chat data={messages} sendMessage={sendMessage} message={message} setMessage={setMessage}/>
    </div>
  );
}

export default App;