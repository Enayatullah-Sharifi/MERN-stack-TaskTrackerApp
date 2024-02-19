import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../component/Spinner";

function Update() {
  const { id } = useParams();
  const [task, setTask] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    const response = fetch(`http://localhost:5000/${id}`)
      .then((res) => res.json())
      .then((data) => setTask(data.task));
    setIsLoading(false);
  }, []);
  const handleUpdate = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task }),
    });

    if (!res.ok) {
      setIsLoading(false);
    }

    if (res.ok) {
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
          <h1>Update Task</h1>
          <form onSubmit={handleUpdate}>
            <textarea
              cols="30"
              rows="10"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            ></textarea>
            <button className="submit-btn">Update</button>
          </form>
        </div>
      )}
    </>
  );
}

export default Update;
