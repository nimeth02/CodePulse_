import React from "react";
import "./ChatSection.scss";

const ChatSection: React.FC = () => {
  console.log("chat section");

  return (
    <div className="chatbot">
      <div className="chatbot-messages">
        <p>Chat messages will appear here</p>
      </div>
      <div className="chatbot-input">
        <input type="text" placeholder="Type your message..." />
        <button>Send</button>
      </div>
    </div>
  );
};

export default ChatSection;
