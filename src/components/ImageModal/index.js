import React from "react";

function ImageModal({ imageUrl, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <img src={imageUrl} sx={{width:"30rem", height:"30rem" }} alt="Modal" />
      </div>
    </div>
  );
}


export default ImageModal;
