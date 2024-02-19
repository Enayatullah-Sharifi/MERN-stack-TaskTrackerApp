import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Spinner from "../component/Spinner";

function Add() {
  const [task, setTask] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const res = await fetch("http://localhost:5000", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task }),
    });
    if (!res.ok) {
      setIsLoading(false);
      setError("Error creating task");
    }
    if (res.ok) {
      setTask("");
      setIsLoading(false);
      navigate("/");
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="form-container">
          <h1>Add New Task</h1>
          <form onSubmit={handleSubmit}>
            <textarea
              cols="30"
              rows="10"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            ></textarea>
            <button className="submit-btn">Add</button>
          </form>
        </div>
      )}
    </>
  );
}

export default Add;
