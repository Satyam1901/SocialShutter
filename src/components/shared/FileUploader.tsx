import React, { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "../ui/button";

type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    const [selectedFile] = acceptedFiles;
    setFile(selectedFile);
    fieldChange([selectedFile]);
    setFileUrl(URL.createObjectURL(selectedFile));
  }, [fieldChange]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <>        <div className="flex flex-1 justify-center  w-full p-5 lg:p-10"> 
        <img src={fileUrl} alt={fileUrl} className="file_uploader-img" /> 
        </div>
        <p className="file_uploader-label">Click or drag photo to replace</p>
        </>
        
      ) : (
        <div className="file_uploader-box">
          <img src="/assets/icons/file-upload.svg" width={96} height={77} />
          <h3 className="base-medium text-light-2 mb-2 mt-65">
            Drag Photo Here
          </h3>
          <p className="text-light-4 small-regular mb-6">AVG, PNG, JPG</p>

          <Button className="shad-button_dark_4">
            Select From your Device
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
