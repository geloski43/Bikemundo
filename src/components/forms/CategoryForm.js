import React from "react";

const CategoryForm = ({ handleSubmit, name, setName }) => (
  <form onSubmit={handleSubmit}>
    <div className="forms form-group">
      <label>Name</label>
      <input
        type="text"
        className="form-control"
        onChange={(e) => setName(e.target.value)}
        defaultValue={name}
        autoFocus
        required
      />
      <br />
      <button className="btn btn-outline-primary">Save</button>
    </div>
  </form>
);

export default CategoryForm;
