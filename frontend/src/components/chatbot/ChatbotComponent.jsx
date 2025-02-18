import React, { useState } from 'react';
import { FaUser } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { VscRobot } from "react-icons/vsc";
import "../../styles/chatbot/ChatbotComponent.css";
import GrayTextarea from '../general/GrayTextarea';
import { sendAQuestion } from '../../services/chatbot';

export default function ChatbotComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [grayTextareaInput, setGrayTextareaInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Bonjour ! Comment puis-je vous aider aujourd'hui ?" }
  ]);

  const handleOpenChatbot = () => {
    const chatbotFrame = document.querySelector(".chatbot-frame");

    if (isOpen) {
      chatbotFrame.classList.remove("opening");
      chatbotFrame.classList.add("closing");
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    } else {
      setIsOpen(true);
    }
  };



  const handleInputChange = (event) => {
    const text = event.target.value.slice(0, 200);
    setGrayTextareaInput(text);
  };

  const handleSendMessage = async () => {
    if (grayTextareaInput.trim() !== "") {
      setMessages([...messages, { sender: "user", text: grayTextareaInput }]);
      try {
        const response = await sendAQuestion({ question: grayTextareaInput });
        // console.log(response);
        setMessages(prevMessages => [...prevMessages, { sender: "bot", text: response.answer }]);
      } catch (error) {
        console.error("erreur lors de l'envoi de la réponse.", error);
        setMessages(prevMessages => [...prevMessages, { sender: "bot", text: "Une erreur s'est produite. Veuillez réessayer plus tard." }]);
      }
      setGrayTextareaInput("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`chatbot-container`}>
      <div className={`chatbot-frame ${isOpen ? "block-chatbot opening" : "hidden-chatbot"}`}>
        <IoIosClose className='close-chat' onClick={handleOpenChatbot} />
        <div className="chatbot-content">
          <section className="chatbot-talking-section">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message-container ${message.sender === "bot" ? "bot-message bot-row" : "user-message user-row"
                  }`}
              >
                {message.sender === "user" ? (
                  <FaUser width={24} height={24} className="user-icon" />
                ) : (
                  <VscRobot width={24} height={24} className="bot-icon" />
                )}
                <p className={`message-text ${message.sender === "bot" ? "bot-color-message" : "user-color-message"}`}>{message.text}</p>
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
              onKeyDown={handleKeyDown}
            />
            <button
              className="chatbot-submit-button"
              disabled={grayTextareaInput.trim().length === 0}
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
