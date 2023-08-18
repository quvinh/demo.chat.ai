import React, { useState } from "react";

export default function File() {
  const [selectedFile, setSelectedFile] = useState([]);

  const handleFileChange = (event) => {
    const uploadFiles = Array.from(event.target.files);
    setSelectedFile([... selectedFile, ...uploadFiles]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Perform upload logic here, e.g., send the file to the server
      console.log("Uploading file:", selectedFile);
    } else {
      console.log("No file selected");
    }
  };

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
            </tr>
          </thead>
          <tbody>
            {
                selectedFile.length > 0 ? selectedFile.map((file, index) => (
                    <tr key={index}>
                        <td>
                            {index}
                        </td>
                        <td>
                            {file.name}
                        </td>
                    </tr>
                )) : 'Chưa upload file'
            }
          </tbody>
        </table>
      </div>
      <div className="file__tab__bottom"></div>
    </div>
  );
}
