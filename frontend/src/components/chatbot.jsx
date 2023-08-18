import React, { useState, useEffect, useRef } from "react";
import avatarBot from "../public/images/internet-bot-computer-icons-chatbot-clip-art-sticker.png"; 
import userAvatar from "../public/images/user-avatar2.png";
import "../chatbot.css"; // Hãy chắc chắn thay thế bằng đường dẫn thực tế đến tệp CSS của bạn
import SendIcon from "../public/icons/sendicon";
import IconClose from "../public/icons/iconClose";

function App() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messageTimestamps, setMessageTimestamps] = useState([]);
  const lastMessageRef = useRef(null);
  const chat = async (e, message) => {
    e.preventDefault();

    if (!message) return;
    setIsTyping(true);
    scrollTo(0, 1e10);
    let msgs = chats;
    msgs.push({ role: "user", content: message});
    setChats(msgs);
    setMessage("");
    const currentTime = new Date().getTime();
    setMessageTimestamps(prevTimestamps => [...prevTimestamps, currentTime]);
    fetch("http://localhost:2000/chat", {
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
        const currentTime = new Date().getTime();
        setMessageTimestamps(prevTimestamps => [...prevTimestamps, currentTime]);
        setIsTyping(false);
        scrollTo(0, 1e10);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [lastMessageRef.current]);


  return (
    <div className="chat-box-position">
          <div className={`chat-window ${showChat ? "popuping" : "unpopup"}`}>
            <div className="chat-header">
              <div className="button-close"  onClick={() => setShowChat(!showChat)}>
               <IconClose />
              </div>
              <h1>ChatBot Demo</h1>
            </div>
            <div className="chat-body">
            {chats.map((chat, index) => (
              <div key={index} className= {`message-container ${chat.role === "user" ? "user_msg" : "bot_msg"}`} ref={index === chats.length - 1 ? lastMessageRef : null}>
                {chat.role === "user" ? (
                      <>       
                      <div className="message-timestamp-user">
                       
                          <p>Bạn: {new Date(messageTimestamps[index]).toLocaleTimeString()}</p>
                   
                      </div>
                      <div className="wrap-message-user">         
                        <div className="user-avatar-msg">
                          <img src={userAvatar} width={25}/>
                        </div>
                        <div className="box-user-msg message-box">
                          {chat.content}
                        </div>
                        </div> 
                        {/* Đây là phần của div cho chat.role === "user" */}
                      </>
                    ) : (
                      <>
                      <div className="message-timestamp-chatbot">
                       
                       <p>Bot: {new Date(messageTimestamps[index]).toLocaleTimeString()}</p>
                
                   </div>
                      <div className="wrap-message-chatbot">
                       <div className="bot-avatar-msg">
                          <img src={avatarBot}  width={25}/>
                        </div>
                        <div className="box-bot-msg message-box">
                          {chat.content}
                        </div>
                        </div>
                        {/* Đây là phần của div cho chat.role == "bot" */}
                      </>
                    )}
              </div>
            ))}
            
            <div className={`message-container-loading bot_msg ${isTyping ? "" : "hide"}`}>
              <div className={`bot-avatar-msg`}>
                  <img src={avatarBot} width={25}/>
              </div>
               <div className="box-bot-msg message-box loading">
                  {isTyping ? (
                    <>
                    <span></span>
                    <span></span>
                    <span></span>
                    </>
                  ) : (
                    <>
                    </>
                  )}
              </div>
              </div>
            </div>
            <div className="chat-footer">
              <form onSubmit={(e) => chat(e, message)}>
                <div className="form-group">
                <input
                  type="text"
                  name="message"
                  value={message}
                  placeholder="Chat với bot..."
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button className="button-submit-chat"><SendIcon /></button>
                </div>
              </form>
            </div>
          </div> 
      

       <div className={`chatbot-icon ${!showChat ? "hidden" : ""}`}>
        <button className="toggle-button-chatbot"  onClick={() => setShowChat(!showChat)}>
          <div className="icon-chat-bot"> <img src={avatarBot} width={35} alt="Chatbot" /></div>      
        </button>       
        </div>

    </div>
  );
}

export default App;
