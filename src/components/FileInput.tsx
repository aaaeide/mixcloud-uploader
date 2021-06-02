import React, { useRef } from 'react';

interface FileInputProps {
  onFileSelect: (f: File) => void;
}

/**
 * Wrapper around the HTML file input that handles single file uploads.
 */
export const FileInput: React.FC<FileInputProps> = ({ onFileSelect }) => {
  const inputEl = useRef(null);

  const handleFileInput: React.ChangeEventHandler<HTMLInputElement> = (
    evt,
  ): void => {
    evt.preventDefault();

    if (evt.target.files !== null && evt.target.files.length === 1) {
      onFileSelect(evt.target.files[0]);
      return;
    }

    alert('Noe gikk galt under opplastingen av filen din. Prøv igjen.');
  };

  return <input type='file' ref={inputEl} onChange={handleFileInput} />;
};
