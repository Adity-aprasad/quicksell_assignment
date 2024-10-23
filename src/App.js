import React from "react";
import "./App.css";
import KanbanBoard from "./components/KanbanBoard/KanbanBoard";

function App() {
  return (
    <div className="App">
      <KanbanBoard
        url={"https://api.quicksell.co/v1/internal/frontend-assignment"}
      />
    </div>
  );
}

export default App;
