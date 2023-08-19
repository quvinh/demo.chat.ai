import React, { useState, useEffect } from "react";
import axios from "axios";

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
      const filteredFineTunes = response.data.data.filter((item) => item.fine_tuned_model);
      setFineTunes(filteredFineTunes);
      console.log(filteredFineTunes);
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
        setResponseMessage("Fine-tuning model created successfully");
      } catch (error) {
        console.error("Error creating fine-tuning model:", error);
        setResponseMessage("Error creating fine-tuning model");
      }
    } else {
      setResponseMessage("Please enter the training file ID");
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
    <div>
      <h2>Create Fine-Tuning Model</h2>
      <label>
        Training File ID:
        <input
          type="text"
          value={trainingFileId}
          onChange={(e) => setTrainingFileId(e.target.value)}
        />
      </label>
      <label>
        Model:
        <select value={model} onChange={(e) => setModel(e.target.value)}>
          <option value="davinci">davinci</option>
          {/* Add other model options here */}
        </select>
      </label>
      <button onClick={handleCreateFineTuning}>Create Fine-Tuning Model</button>
      <p>{responseMessage}</p>
      <h2>List of Fine-Tunes</h2>
      <div className="list-file-tunes">
        <table>
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
      <h2>Completion Chat</h2>
      <label>
      Fine-Tune Model:
        <select
          value={selectedFineTune}
          onChange={(e) => setSelectedFineTune(e.target.value)}
        >
          <option value="">Select a Fine-Tune Model</option>
          {fineTunes.map((fineTune) => (
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
  );
}
