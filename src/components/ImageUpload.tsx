import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const { VITE_CLOUD_NAME, VITE_UPLOAD_PRESET } = import.meta.env;

type Props = {
  initialUrl?: string;
  onUploadedSuccess: (url: string) => void;
};

const ImageUpload = ({ initialUrl, onUploadedSuccess }: Props) => {
  const [uploadMethod, setUploadMethod] = useState<"file" | "url">("file");
  const [uploadUrl, setUploadUrl] = useState<string | null>(initialUrl || null);

  useEffect(() => {
    if (initialUrl) {
      setUploadUrl(initialUrl);
    }
  }, [initialUrl]);

  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = useCallback((e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      uploadToCloudinary(file);
    }
  }, []);

  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      uploadToCloudinary(file);
    }
  };

  const uploadToCloudinary = async (file: File) => {
    const url = `https://api.cloudinary.com/v1_1/${VITE_CLOUD_NAME}/image/upload`;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", VITE_UPLOAD_PRESET);

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.secure_url) {
        setUploadUrl(response.data.secure_url);
        onUploadedSuccess(response.data.secure_url);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="mb-3">
      <div>
        <label>
          <input
            type="radio"
            value="file"
            checked={uploadMethod === "file"}
            onChange={() => setUploadMethod("file")}
          />
          Upload bằng File
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="url"
            checked={uploadMethod === "url"}
            onChange={() => setUploadMethod("url")}
          />
          Upload bằng URL
        </label>
      </div>
      {uploadMethod === "file" && (
        <div
          style={{
            border: "2px dashed #ddd",
            padding: "20px",
            textAlign: "center",
            position: "relative",
            cursor: "pointer",
          }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          {uploadUrl ? (
            <p>Upload thành công !</p>
          ) : (
            <p>Kéo và thả ảnh vào đây hoặc nhấp để chọn ảnh</p>
          )}
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="fileInput"
          />
        </div>
      )}
      {uploadMethod === "url" && (
        <input
          className="form-control"
          type="text"
          placeholder="Nhập URL ảnh"
        />
      )}
    </div>
  );
};

export default ImageUpload;
