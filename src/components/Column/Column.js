import React from "react";
import Card from "../Card/Card";
import "./Column.css";

const Column = ({ title, tickets, getUserName , sorting}) => {
  return (
    <div className="column">
      <div className="column-header">
        <span className="column-title">{title}</span>
        <span className="column-count">{tickets.length}</span>
      </div>
      <div className="column-cards">
        {tickets.map((ticket) => (
          <Card key={ticket.id} ticket={ticket} getUserName={getUserName} />
        ))}
      </div>
    </div>
  );
};

export default Column;
