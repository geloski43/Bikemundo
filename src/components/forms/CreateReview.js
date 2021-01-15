import React from "react";

const CreateReview = ({ setReview, review, handleAddReview }) => {

  return (
    <div className="forms">
      <form >
        <label>Write Review</label>
        <textarea
          type="text"
          name="review"
          defaultValue={review}
          onChange={(e) => setReview(e.target.value)}
          className="form-control mb-4"
        />
        <br />
        <button disabled={!review} onClick={handleAddReview} className="btn btn-outline-primary">Submit Review</button>
      </form>
    </div>
  );
};

export default CreateReview;