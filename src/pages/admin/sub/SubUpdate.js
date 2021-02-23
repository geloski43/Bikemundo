import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import { updateSub, getSub } from "../../../functions/sub";
import Select from 'react-select'
// import chroma from "chroma-js";

const SubUpdate = ({ match, history }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");


  // const colourStyles = {
  //   control: styles => ({ ...styles, backgroundColor: 'white' }),
  //   option: (styles, { data, isDisabled, isFocused, isSelected }) => {
  //     const color = new chroma(data.color);
  //     return {
  //       ...styles,
  //       backgroundColor: isDisabled ? 'red' : 'blue',
  //       color: '#FFF',
  //       cursor: isDisabled ? 'not-allowed' : 'default',
  //     }
  //   }
  // };


  useEffect(() => {
    loadCategories();
    loadSub();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSub = () =>
    getSub(match.params.slug).then((s) => {
      setName(s.data.sub.name);
      setParent(s.data.sub.parent);
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    updateSub(match.params.slug, { name, parent }, user.token)
      .then((res) => {

        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is updated`);
        history.push("/admin/sub");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };


  let existingParent = parent && categories && categories.find(
    selectedParent => (
      selectedParent._id === parent
    )
  );

  const options = categories.length > 0 &&
    categories.map(c => ({
      "value": c._id,
      "label": c.name
    }))

  return (
    <div className="forms container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
              <h4>Update sub category</h4>
            )}

          <div className="form-group">
            <span>Update Parent category</span>

            <Select
              placeholder={existingParent.name}
              onChange={(options) => setParent(options.value)}
              options={options}
            />

            {/* <select
              name="category"
              className="form-control"
              onChange={(e) => setParent(e.target.value)}
            >

              <option >{existingParent.name}</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id} defaultValue={c._id === parent}>
                    {c.name}
                  </option>
                ))}
            </select> */}

          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
              />
              <br />
              <button className="btn btn-outline-primary">Save</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default SubUpdate;
