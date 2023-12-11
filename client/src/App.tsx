import { useEffect, useState } from "react";
import io from "socket.io-client";
import UsernameModal from "./components/UsernameModal";

// Connect to Socket.IO server
const socket = io("http://10.0.0.43:5001"); // Replace with your server URL and port

function App() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [username, setUsername] = useState("");

  useEffect(() => {
    setIsModalOpen(true); // Open the modal when the webpage loads
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // const sendMessage = () => {
  //   socket.emit("send_message", message); // Replace 'send_message' with your custom event
  //   setMessage("");
  // };

  const sendUsername = () => {
    socket.emit("send_username", username);
  };

  socket.on('send_username', (username) => {
    console.log(username)
  });

  return (
    <div>
      <h2>hello</h2>
      <UsernameModal
        isOpen={isModalOpen} onClose={closeModal} onSave={sendUsername} username={username} setUsername={setUsername}
      />
    </div>
  );
}

export default App;