import React, { useRef,useState,useEffect } from "react";
import "./ChatSection.scss";
import { Button, TextField, CircularProgress } from "@mui/material";
import { useChatData } from "./hooks/useChatData";


const ChatSection: React.FC = () => {
  console.log("chat section");

  const {messages,
    handleSendMessage,
    isLoading,
    error,}= useChatData()
  
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

  const handleSend = () => {
    if (inputMessage.trim() && !isLoading) {
      handleSendMessage(inputMessage);
      setInputMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
<div className="chatbot">
      <div className="chatbot-container">
        <div className="chatbot-messages">
          <div className="chatbot-welcome">
            <div className="chatbot-logo">
            </div>
            <div className="chatbot-options">
              <div className="welcome-text">
                We are here to help you. Ask anything about your project
              </div>
            </div>
          </div>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.sender === "user" ? "message-user" : "message-bot"
              }`}
            >
              {
                message.sender === "user" ? <div className="message-content">
                {message.text.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    {i !== message.text.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </div> : <div
        className="message-content"
        dangerouslySetInnerHTML={{ __html: message.text }}
      />
              }
              
            </div>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="message message-bot">
              <div className="message-content loading-message">
                <div className="loading-spinner">
                  <CircularProgress size={20} />
                </div>
                <span>Thinking...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        <div className="chatbot-input">
          <TextField
            label=""
            variant="outlined"
            multiline
            rows={1}
            fullWidth
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            placeholder={isLoading ? "Please wait..." : "Type your message..."}
          />
          <Button
            variant="contained"
            className="send-button"
            onClick={handleSend}
            disabled={isLoading || !inputMessage.trim()}
            startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : null}
          >
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
