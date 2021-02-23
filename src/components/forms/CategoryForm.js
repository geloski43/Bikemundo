import React, { useState } from "react";
import { Modal } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { PlusSquareOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";

const CategoryForm = ({ handleSubmit, name, setName }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);

  let history = useHistory();
  let { slug } = useParams();

  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true);
    } else {
      history.push({
        pathname: "/login",
        state: { from: `/product/${slug}` },
      });
    }
  };

  return (
    <div>
      <div className="row ml-1 mt-3">
        <h6 className="mt-1">Add</h6>
        <PlusSquareOutlined
          onClick={handleModal}
          className="pointer"
          style={{ fontSize: '25px', color: '#08c', marginLeft: "10px" }} />
      </div>
      <Modal
        className="forms"
        title="Create"
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
          handleSubmit();
        }}
        onCancel={() => setModalVisible(false)}
      >

        <form >
          <div className="forms form-group">
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
          </div>
        </form>

      </Modal>
    </div>
  )

};

export default CategoryForm;
