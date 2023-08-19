import React, { useState } from "react";
import File from "../tab/File";
import FineTune from "../tab/FireTune";

export default function Main() {
  const [activeTab, setActiveTab] = useState(null);

  const handleClickSwitchTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="main">
      <div className="main__feature">
          {/* Feature File */}
          <button
            className="main__feature__button"
            onClick={() => handleClickSwitchTab("file")}
          >
            File
          </button>
          {/* Feature Fine Tunes */}
          <button
            className="main__feature__button"
            onClick={() => handleClickSwitchTab("fine-tunes")}
          >
            Fine Tunes
          </button>
      </div>
      {activeTab === 'file' && <File />}
      {activeTab === 'fine-tunes' && <FineTune />}
    </div>
  );
}
