import React from "react";
import "./ChatSection.scss";
import { Button, TextField } from "@mui/material";

const ChatSection: React.FC = () => {
  console.log("chat section");

  return (
    <div className="chatbot">
      <div className="chatbot-messages">
        <p>Chat messages will appear here</p>
      </div>
      <div className="chatbot-input">
        <TextField
          label="Message"
          variant="outlined"
          multiline
          rows={1}
          fullWidth
        />
        <Button variant="contained"  className="send-button">
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatSection;
