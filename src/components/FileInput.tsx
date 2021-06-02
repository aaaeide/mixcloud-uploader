import React, { useRef } from 'react';

interface FileInputProps {
  maxSize?: number;
  onFileSelect: (f: File) => void;
}

/**
 * Wrapper around the HTML file input that handles single file uploads.
 */
export const FileInput: React.FC<FileInputProps> = ({
  onFileSelect,
  maxSize = Number.MAX_SAFE_INTEGER,
}) => {
  const inputEl = useRef(null);

  const handleFileInput: React.ChangeEventHandler<HTMLInputElement> = (
    evt,
  ): void => {
    evt.preventDefault();

    if (evt.target.files === null || evt.target.files.length !== 1) {
      alert('Something went wrong! Please try again.');
      return;
    }

    const file = evt.target.files[0];

    if (file.size > maxSize) {
      alert('File too large! Please try again with a smaller file.');
      return;
    }

    onFileSelect(evt.target.files[0]);
  };

  return <input type='file' ref={inputEl} onChange={handleFileInput} />;
};
