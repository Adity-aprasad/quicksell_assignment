import React, { useState, useEffect, useMemo } from "react";
import Column from "../Column/Column";
import "./KanbanBoard.css";
import Display from "../GroupingMenu/GroupingMenu";

const KanbanBoard = ({ url }) => {
  const [grouping, setGrouping] = useState(
    localStorage.getItem("grouping") ?? "status"
  );
  const [sorting, setSorting] = useState(
    localStorage.getItem("sorting") ?? "priority"
  );
  const [groupedTickets, setGroupedTickets] = useState({});
  const [data, setData] = useState({ tickets: [], users: [] });

  const statuses = useMemo(
    () => ["Backlog", "Todo", "In progress", "Done", "Canceled"],
    []
  );
  const priorities = useMemo(
    () => ["Urgent", "High", "Medium", "Low", "No priority"],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [url]);

  const getUserName = (userId) => {
    const user = data.users.find((user) => user.id === userId);
    return user ? user.name : "Unknown User";
  };

  useEffect(() => {
    localStorage.setItem("grouping", grouping);
    localStorage.setItem("sorting", sorting);

    const groupTickets = () => {
      const grouped = {};

      if (grouping === "status") {
        statuses.forEach((status) => {
          grouped[status] = [];
        });
      } else if (grouping === "priority") {
        priorities.forEach((priority, index) => {
          grouped[priority] = [];
        });
      }

      data.tickets.forEach((ticket) => {
        let key;
        if (grouping === "status") key = ticket.status;
        else if (grouping === "user")
          key = data.users.find((user) => user.id === ticket.userId).name;
        else if (grouping === "priority") key = priorities[ticket.priority];

        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(ticket);
      });

      // Sort tickets within each group
      Object.keys(grouped).forEach((key) => {
        grouped[key].sort((a, b) => {
          if (sorting === "priority") return b.priority - a.priority;
          return a.title.localeCompare(b.title);
        });
      });

      setGroupedTickets(grouped);
    };

    if (data.tickets.length > 0) {
      groupTickets();
    }
  }, [grouping, sorting, statuses, priorities, data]);

  const renderColumns = () => {
    if (grouping === "status") {
      return statuses.map((status) => (
        <Column
          key={status}
          title={status}
          tickets={groupedTickets[status] || []}
          getUserName={getUserName}
        />
      ));
    } else if (grouping === "priority") {
      return priorities.map((priority) => (
        <Column
          key={priority}
          title={priority}
          tickets={groupedTickets[priority] || []}
          getUserName={getUserName}
        />
      ));
    } else {
      return Object.entries(groupedTickets).map(([key, tickets]) => (
        <Column
          key={key}
          title={key}
          tickets={tickets}
          getUserName={getUserName}
        />
      ));
    }
  };

  const handleGroupingChange = (newGrouping) => {
    setGrouping(newGrouping);
  };

  const handleSortingChange = (newSorting) => {
    setSorting(newSorting);
  };

  return (
    <div className="kanban-board">
      <Display
        grouping={grouping}
        sorting={sorting}
        onGroupingChange={handleGroupingChange}
        onSortingChange={handleSortingChange}
      />
      <div className="board-columns">{renderColumns()}</div>
    </div>
  );
};

export default KanbanBoard;
