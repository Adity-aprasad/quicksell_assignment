import React from "react";
import "./Card.css";

const Card = ({ ticket, getUserName, sorting }) => {
  const getPriorityName = (priority) => {
    const priorities = ["No priority", "Low", "Medium", "High", "Urgent"];
    return priorities[priority];
  };

  // Conditionally render icons based on sorting criteria
  const getSortingIcon = () => {
    if (sorting === "priority") {
      return "🔥"; // Example: Fire icon for priority sorting
    } else if (sorting === "title") {
      return "📚"; // Example: Book icon for title sorting
    }
    return "✏️"; // Default icon
  };

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-id">{ticket.id}</span>
        <span className="card-avatar">
          {getUserName(ticket.userId).charAt(0)}
        </span>
      </div>
      <h3 className="card-title">
        {getSortingIcon()} {/* Display the icon based on sorting */}
        {ticket.title}
      </h3>
      <div className="card-footer">
        <span className="card-priority">
          {getPriorityName(ticket.priority)}
        </span>
        {ticket.tag.map((tag, index) => (
          <span key={index} className="card-tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Card;
