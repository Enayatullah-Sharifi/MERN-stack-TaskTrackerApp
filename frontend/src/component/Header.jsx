import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="header">
        <div className="navbar">
          <Link to="/" className="logo">
            TaskTrackerApp
          </Link>
          <Link to="/add">Add Task</Link>
        </div>
      </div>
    </>
  );
}

export default Header;
