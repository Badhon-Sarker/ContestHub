import React, { useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

import { Form, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const UserRoleModal = ({ id, reload, setReload }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onSubmit = (data) => {
    const role = data.contestType;

    const info = {
      role,
    };
    // console.log(role);

    // console.log(id);

    // axios
    //   .put(`${import.meta.env.VITE_URL}/editRole/${id}`, role)
    //   .then((res) => {
    //     if (res.data.modifiedCount > 0) {
    //       toast.success("Successfully Edited");
    //     }
    //   })
    //   .catch((err) => console.error(err));

    fetch(`${import.meta.env.VITE_URL}/editRole/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Role Updated");
          setReload(!reload);
        }
      });

    setIsOpen(false);
  };

  return (
    <div>
      <div>
        <button className="btn bg-fuchsia-300" onClick={openModal}>
          Open Modal
        </button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div>Select the role</div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <select
              className="select select-bordered w-full mb-2"
              {...register("contestType", { required: true })}
            >
              <option value={"admin"}>Admin</option>
              <option value={"creator"}>Creator</option>
              <option value={"user"}>User</option>
            </select>

            <div className="flex justify-between gap-5">
              <div>
                <input className="btn btn-red-300" type="submit" />
              </div>
              <div>
                {" "}
                <button className="btn btn-red-300" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default UserRoleModal;
