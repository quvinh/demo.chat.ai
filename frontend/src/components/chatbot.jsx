import React, { useState, useEffect, useRef } from "react";
import myImage from "../images/internet-bot-computer-icons-chatbot-clip-art-sticker.png"; 
import "../chatbot.css"; // Hãy chắc chắn thay thế bằng đường dẫn thực tế đến tệp CSS của bạn


function App() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const chat = async (e, message) => {
    e.preventDefault();

    if (!message) return;
    setIsTyping(true);
    scrollTo(0, 1e10);

    let msgs = chats;
    msgs.push({ role: "user", content: message });
    setChats(msgs);

    setMessage("");

    fetch("http://localhost:2000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chats,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        msgs.push(data.output);
        setChats(msgs);
        setIsTyping(false);
        scrollTo(0, 1e10);
      })
      .catch((error) => {
        console.log(error);
      });
  };

 

  return (
    <div class="chat-box-position">
          <div className={`chat-window ${showChat ? "popuping" : "unpopup"}`}>
            <div className="chat-header">
              <h1>ChatBot Demo</h1>
            </div>
            <div className="chat-body">
            {chats.map((chat, index) => (
              <p key={index} className={chat.role === "user" ? "user_msg" : ""}>
                <span>
                  <b>{chat.role.toUpperCase()}</b>
                </span>
                <span>:</span>
                <span>{chat.content}</span>
              </p>
            ))}
              <div className={isTyping ? "" : "hide"}>
                <p>
                  <i>{isTyping ? "Typing" : ""}</i>
                </p>
              </div>
            </div>
            <div className="chat-footer">
              <form onSubmit={(e) => chat(e, message)}>
                <input
                  type="text"
                  name="message"
                  value={message}
                  placeholder="Type a message here and hit Enter..."
                  onChange={(e) => setMessage(e.target.value)}
                />
              </form>
            </div>
          </div> 
      

       <div className={`chatbot-icon ${!showChat ? "hidden" : ""}`}>
        <button class="toggle-button-chatbot"  onClick={() => setShowChat(!showChat)}>
          <div class="icon-chat-bot"> <img src={myImage} width={35} alt="Chatbot" /></div>      
        </button>       
        </div>

    </div>
  );
}

export default App;
