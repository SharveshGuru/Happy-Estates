import React from "react";
import styles from "./Popup.module.css";

const Popup = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className={styles.popupOverlay} onClick={onClose}>
        <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
          <button className={styles.popupClose} onClick={onClose}>
            &times;
          </button>
          {children}
        </div>
      </div>
    );
};
  
  export default Popup;