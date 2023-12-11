import React from "react";

interface UsernameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (username: string) => void;
  setUsername: React.Dispatch<React.SetStateAction<string>>
  username: string;
}

const UsernameModal: React.FC<UsernameModalProps> = ({ isOpen, onClose, onSave, setUsername, username }) => {
  if (!isOpen) return null;
  const handleSave = () => {
    onSave(username);
    setUsername("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Enter your username</h2>
          <input
            type="text"
            placeholder="Username"
            className="border rounded-lg w-full py-2 px-3 mb-4"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
  );
};

export default UsernameModal;