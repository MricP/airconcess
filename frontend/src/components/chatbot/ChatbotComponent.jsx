import React, { useState } from 'react';
import { FaUser } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { VscRobot } from "react-icons/vsc";
import "../../styles/chatbot/ChatbotComponent.css";
import GrayTextarea from '../general/GrayTextarea';

export default function ChatbotComponent() {
  const [isOpen, setIsOpen] = useState(true);
  const [grayTextareaInput, setGrayTextareaInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Bonjour ! Comment puis-je vous aider aujourd'hui ?" }
  ]);

  const handleOpenChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (event) => {
    if (event.target.value.length <= 200) {
      setGrayTextareaInput(event.target.value);
    }
  };

  const handleSendMessage = () => {
    if (grayTextareaInput.trim() !== "") {
      setMessages([...messages, { sender: "user", text: grayTextareaInput }]);
      setGrayTextareaInput("");
    }
  };

  return (
    <div className={`chatbot-container`}>
      <div className={`chatbot-frame ${isOpen ? "block-chatbot" : "hidden-chatbot"}`}>
        <IoIosClose className='close-chat' onClick={handleOpenChatbot} />
        <div className="chatbot-content">
          <section className="chatbot-talking-section">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message-container ${
                  message.sender === "bot" ? "bot-message bot-row" : "user-message user-row"
                }`}
              >
                {message.sender === "user" ? (
                  <FaUser className="user-icon" />
                ) : (
                  <VscRobot className="bot-icon" />
                )}
                <p className={`message-text ${
                  message.sender === "bot" ? "bot-color-message" : "user-color-message"}`}>{message.text}</p>
              </div>
            ))}
          </section>
          <form
            className="chatbot-send-infos"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <p>{grayTextareaInput.length} / 200 caractères</p>
            <GrayTextarea
              placeholder={"Entrez votre message..."}
              value={grayTextareaInput}
              onChange={handleInputChange}
            />
            <button
              className="chatbot-submit-button"
              disabled={grayTextareaInput.length === 0}
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
      <div
        className={`chatbot-circle ${!isOpen ? "block-chatbot" : "hidden-chatbot"}`}
        onClick={handleOpenChatbot}
      >
        <VscRobot className="chatbot-robot-icon" />
      </div>
    </div>
  );
}
