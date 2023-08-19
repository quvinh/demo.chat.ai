import React, { useState, useEffect } from "react";
import axios from "axios";
export default function File() {
  const [selectedFile, setSelectedFile] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [deleteFileId, setDeleteFileId] = useState(null); // Lưu file ID mà người dùng muốn xóa
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
  // Fetch lại list khi đã action
  useEffect(() => {
    fetchFileList();
  }, []);

  const fetchFileList = async () => {
    try {
      const response = await axios.get("http://localhost:2000/files"); // Update the URL
      setFileList(response.data.data);
    } catch (error) {
      console.error("Error fetching file list:", error);
    }
  };
  const handleDelete = async (fileId) => {
    setDeleteFileId(fileId); // Lưu file ID mà người dùng muốn xóa vào state
  };

  const confirmDelete = async () => {
    if (deleteFileId !== null) {
      try {
        await axios.delete(`http://localhost:2000/files/${deleteFileId}`); // Update the URL
        console.log("File deleted:", deleteFileId);
        fetchFileList(); // Fetch updated file list
        setDeleteFileId(null); // Reset the deleteFileId state
      } catch (error) {
        console.error("Error deleting file:", error);
      }
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
            {selectedFile.length > 0
              ? selectedFile.map((file, index) => (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{file.name}</td>
                  </tr>
                ))
              : "Chưa upload file"}
          </tbody>
        </table>
      </div>
      <div className="file__tab__middle">
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>File name upload</th>
              <th>ID</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {fileList.length > 0
              ? fileList.map((file, index) => (
                  <tr key={file.file_id}>
                    <td>{index + 1}</td>
                    <td>{file.filename}</td>
                    <td>{file.id}</td>
                    <td>{file.status}</td>                 
                    <td>{new Date(file.created_at).toLocaleTimeString()}</td>
                    <td><button className="btn-action__delete-file" onClick={() => handleDelete(file.id)}>Delete</button></td>
                  </tr>
                ))
              : "Không có file"}
          </tbody>
        </table>
         {/* Hiển thị hộp thoại xác nhận */}
      {deleteFileId !== null && (
        <div className={`box-comfirm__delete-file fade-in ${deleteFileId !== null ? 'show' : ''}`}>
        <p>Bạn có chắc chắn muốn xóa file này?</p>
        <button onClick={confirmDelete}>Xóa</button>
        <button className="cancel" onClick={() => setDeleteFileId(null)}>Hủy</button>
      </div>
      )}
      </div>
      <div className="file__tab__bottom"></div>
    </div>

  );
}
