import React from 'react'

function Form() {
  return (
    <>
    <div className="form-container">
        <h1>Add New Task</h1>
        <form>
          <textarea cols="30" rows="10"></textarea>
          <button className="submit-btn">Add</button>
        </form>
      </div>
    </>
  )
}

export default Form