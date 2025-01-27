import React from 'react';

const FileDisplay = ({ base64Data, mimeType, docname }) => {
  // Function to display file based on MIME type
  const renderFile = () => {
    if (!base64Data || !mimeType) return <p>No file to display</p>;

    
    if (mimeType.startsWith('image/')) {
      return <img src={`data:${mimeType};base64,${base64Data}`} alt="file" style={{maxWidth:"800vw"}}/>;
    }
    
    if (mimeType === 'application/pdf') {
      return <iframe src={`data:${mimeType};base64,${base64Data}`} width="800vw" height="500vh" title={docname} />;
    }
    
    if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      return (
        <a href={`data:${mimeType};base64,${base64Data}`} download={docname+".docx"}>
          Download Word Document
        </a>
      );
    }
    
    if (mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      return (
        <a href={`data:${mimeType};base64,${base64Data}`} download={docname+".xlsx"}>
          Download Excel Document
        </a>
      );
    }
    
    if (mimeType === 'text/plain') {
      return (
        <a href={`data:${mimeType};base64,${base64Data}`} download={docname+".txt"}>
          Download Text File
        </a>
      );
    }

    
    return <p>Unsupported file type.</p>;
  };

  return (
    <div>
      {renderFile()}
    </div>
  );
};

export default FileDisplay;
