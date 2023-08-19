import React, { useState, useEffect } from "react";
import axios from "axios";
export default function File() {
  const [selectedFile, setSelectedFile] = useState([]);
  const [fileList, setFileList] = useState([]);
  const handleFileChange = (event) => {
    const uploadFiles = Array.from(event.target.files);
    setSelectedFile([...selectedFile, ...uploadFiles]);
  };

  const handleUpload = async () => {
    if (selectedFile.length > 0) {
      const formData = new FormData();
      selectedFile.forEach((file) => {
        formData.append("file", file);
      });

      try {
        const response = await axios.post("http://localhost:2000/files/upload", formData); // Update the URL
        console.log("Server response:", response.data);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      console.log("No file selected");
    }
  };
  useEffect(() => {
    axios.get("http://localhost:2000/files")
      .then(response => {
        setFileList(response.data.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error("Error fetching file list:", error);
      });
  }, []);

  return (
    <div className="file__tab tab">
      <div className="file__tab__top">
        <input type="file" onChange={handleFileChange} />
        <button class="file__tab__top__upload" onClick={handleUpload}>
          Upload
        </button>
      </div>
      <div className="file__tab__middle">
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>File name upload</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {fileList.length > 0
              ? fileList.map((file, index) => (
                  <tr key={file.file_id}>
                    <td>{index + 1}</td>
                    <td>{file.filename}</td>
                    <td>{file.id}</td>
                  </tr>
                ))
              : "Không có file"}
          </tbody>
        </table>
      </div>
      <div className="file__tab__bottom"></div>
    </div>

  );
}
