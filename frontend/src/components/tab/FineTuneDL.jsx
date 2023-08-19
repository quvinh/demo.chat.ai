import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/app.scss"
export default function FineTuning() {
  const [trainingFileId, setTrainingFileId] = useState("");
  const [model, setModel] = useState("davinci");
  const [responseMessage, setResponseMessage] = useState("");
  const [fineTunes, setFineTunes] = useState([]);
  const [selectedFineTune, setSelectedFineTune] = useState("");
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const fetchFineTunes = async () => {
    try {
      const response = await axios.get("http://localhost:2000/fine-tunes");
      const FineTunes = response.data.data
      setFineTunes(FineTunes);
      console.log(FineTunes);
    } catch (error) {
      console.error("Error fetching fine-tunes:", error);
    }
  };
  
  useEffect(() => {
    fetchFineTunes();
  }, []);
  const handleCreateFineTuning = async () => {
    if (trainingFileId) {
      const data = {
        training_file: trainingFileId,
        model: model,
      };

      try {
        const response = await axios.post("http://localhost:2000/fine-tunes", data);
        setResponseMessage("Fine-tuning model được tạo thành công!");
      } catch (error) {
        console.error("Lỗi khi tạo fine-tuning model:", error);
        setResponseMessage("Error creating fine-tuning model");
      }
    } else {
      setResponseMessage("Vui lòng nhật ID của file mà bạn muốn tạo!");
    }
  };
  const handleGenerate = async () => {
    try {
      const response = await axios.post("http://localhost:2000/completions", {
        model: selectedFineTune,
        prompt: prompt,
      });
      setResponse(response.data.choices[0].text);
      console.log(response);
    } catch (error) {
      console.error("Error generating completion:", error);
      setResponse("Error generating completion");
    }
  };
  return (
    <div className="wrapp-screen__fine-tunes container">
      <div class="box-create-list__fine-tunes">
      <div className="box-create__fine-tunes">
        <div class="title__heading title-tab__fine-tuning">
        <h2>Tạo Fine-Tuning Model</h2>
        </div>
    <div class="form-input__create__finetuning">
      <div class="form-group input-id__fine-tuning">
      <label>Training File ID:</label>
        <input
          type="text"
          value={trainingFileId}
          onChange={(e) => setTrainingFileId(e.target.value)}
        />
      
      </div>
      <div class="form-group input-model__fine-tunning">
      <label>Model:</label>
        <select value={model} onChange={(e) => setModel(e.target.value)}>
          <option value="davinci">davinci</option>
          {/* Add other model options here */}
        </select>
        </div>
      <div class="btn-submit__create">
      <button onClick={handleCreateFineTuning}>Create Fine-Tuning Model</button>
      <p>{responseMessage}</p>
      </div>
      </div>
      </div>
      <div class="box-list__fine-tunes">
      <div class="title__heading title-tab__fine-tuning">
      <h2>Danh sách Fine-Tunes</h2>
      </div>
      <div className="list-file-tunes">
        <table class="table">
          <thead>
            <tr>
              <th>STT</th>
              <th>File name</th>
              <th>ID</th>
              <th>fine_tuned_model</th>
              <th>model</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
          {fineTunes.map((fineTune, index) => (
          <tr key={fineTune.file_id}>
          <td>{index + 1}</td>
          <td>{fineTune.object}</td>
          <td>{fineTune.id}</td>
          <td>{fineTune.fine_tuned_model}</td>
          <td>{fineTune.model}</td>
          <td>{fineTune.status}</td>
        </tr>
        ))}
          </tbody>
        </table>
      </div>
      </div>
      </div>
      <div className="box-chat__completion">
      <h2>Completion Chat</h2>
      <label>
      Fine-Tune Model:
        <select
          value={selectedFineTune}
          onChange={(e) => setSelectedFineTune(e.target.value)}
        >
          <option value="">Select a Fine-Tune Model</option>
          {fineTunes.filter((item) => item.fine_tuned_model).map((fineTune) => (
            <option key={fineTune.id} value={fineTune.fine_tuned_model}>
              {fineTune.fine_tuned_model}
            </option>
          ))}
        </select>
      </label>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={5}
        cols={50}
      ></textarea>
      <button onClick={handleGenerate}>Generate</button>
      <div>
        <h3>Response:</h3>
        <p>{response}</p>
      </div>
      </div>
    </div>
  );
}
