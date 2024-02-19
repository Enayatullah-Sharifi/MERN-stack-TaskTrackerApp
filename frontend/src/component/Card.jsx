import { Link, useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { useState } from "react";

function Card(props) {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(props.isCompleted);

  const handleCheckbox = async (e) => {
    setIsChecked(e.target.checked);
    // console.log(isChecked);

    const response = await fetch(
      `http://localhost:5000/checkbox/${props._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isChecked }),
      }
    );
    if (!response.ok) {
      setIsChecked(props.isCompleted);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete");
    if (confirmDelete) {
      const res = await fetch(`http://localhost:5000/${id}`, {
        method: "DELETE",
      });
      const data = res.json();
      if (res.ok) {
        window.location.reload();
        console.log("Delete ");
      }
    }
  };

  return (
    <>
      <div className="card">
        <div className="text">
          <p>{props.task}</p>
          <p className="date">
            Creatd at :{" "}
            {formatDistanceToNow(props.createdAt, { addSuffix: true })}
          </p>
        </div>
        <div className="btns">
          <button className="btn" onClick={(e) => handleDelete(props._id)}>
            Delete
          </button>
          <Link to={`/update/${props._id}`} className="btn">
            Edit
          </Link>
          <span className="checkbox">
            <label>Completed</label>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckbox}
            />
          </span>
        </div>
      </div>
    </>
  );
}

export default Card;
