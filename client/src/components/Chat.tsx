import React from "react";
import { ChatMessage } from "../types";

interface ChatProps {
    data: ChatMessage[];
    sendMessage: () => void;
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const Chat: React.FC<ChatProps> = ({ data, sendMessage, message, setMessage }) => {
    return (
        <div className="max-h-96 overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50"></thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {data.map((row, index) => (
                    <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.message}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <SendArea sendMessage={sendMessage} message={message} setMessage={setMessage}/>
        </div>
    );
}

interface SendAreaProps {
    sendMessage: () => void;
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const SendArea: React.FC<SendAreaProps> = ({sendMessage, setMessage, message}) => {
    return(
        <div className="flex flex-row">
        <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default Chat;