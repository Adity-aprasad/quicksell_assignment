import React, { useState } from "react";
import "./GroupingMenu.css";
import DisplayIcon from "../../assets/Display.svg";

const Display = ({ grouping, onGroupingChange, sorting, onSortingChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="display-menu">
    <button onClick={toggleMenu} className="display-button">
        <img src={DisplayIcon} alt="Display Icon" className="display-icon" /> {/* Add the image */}
        Display <span className="dropdown-arrow">▼</span>
      </button>
      {isOpen && (
        <div className="popup-card">
          <div className="popup-item">
            <span>Grouping</span>
            <select
              value={grouping}
              onChange={(e) => onGroupingChange(e.target.value)}
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="popup-item">
            <span>Ordering</span>
            <select
              value={sorting}
              onChange={(e) => onSortingChange(e.target.value)}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Display;
