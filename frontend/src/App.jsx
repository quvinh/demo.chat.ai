import React from "react";
import "./App.css";
import Chatbot from "./components/chatbot";
import Header from "./components/header/Header";
import Main from "./components/main/Main";

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
      <Chatbot />
    </div>
  );
}

export default App;
