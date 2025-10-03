import React, { useState, useRef } from 'react';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { X } from "lucide-react";

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFilesSelected }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
      onFilesSelected([...selectedFiles, ...newFiles]);
    }
  };

  const handleRemoveFile = (fileToRemove: File) => {
    const updatedFiles = selectedFiles.filter((file) => file !== fileToRemove);
    setSelectedFiles(updatedFiles);
    onFilesSelected(updatedFiles);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      const newFiles = Array.from(event.dataTransfer.files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
      onFilesSelected([...selectedFiles, ...newFiles]);
    }
  };

  return (
    <div className="grid gap-2">
      <Label>Attachments (Optional)</Label>
      <div
        className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer bg-muted/20 hover:bg-muted/30"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <p className="text-sm text-muted-foreground">
          Drag & drop files here or click to browse
        </p>
        <Input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          multiple
        />
      </div>
      <div className="grid gap-2">
        {selectedFiles.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 border rounded-md bg-muted/10"
          >
            <span className="text-sm text-foreground">{file.name}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveFile(file)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
