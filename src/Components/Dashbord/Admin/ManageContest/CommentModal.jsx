import React, { useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

import { Form, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCommentAlt } from "react-icons/fa";

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

const CommentModal = ({ id, reload, setReload }) => {
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
    const comment = data.comment;
  

    const info = {
      comment,
    };

    // axios
    //   .put(`${import.meta.env.VITE_URL}/editComment/${id}`, info)
    //   .then((res) => {
    //     if (res.data.modifiedCount > 0) {
    //       toast.success("Successfully Commented");
    //     }
    //   })
    //   .catch((err) => console.error(err));

    fetch(`${import.meta.env.VITE_URL}/editComment/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Successfully Commented");
          setReload(!reload);
        }
      });

    setIsOpen(false);
  };

  return (
    <div>
      <div>
        <button className="btn bg-fuchsia-300" onClick={openModal}>
          <FaCommentAlt></FaCommentAlt>
        </button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div>Comment Here</div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <input type="text" name="" id="" {...register("comment", { required: true })}/> */}

            <div className="form-control">
              <label className="label">
                <span className="label-text text-white font-playfair">
                  Type your comment
                </span>
              </label>
              <input
                type="text"
                placeholder="Your Comment"
                className="input input-bordered mb-1"
                {...register("comment", { required: true })}
              />
              {errors.registerEmail?.type === "required" && (
                <p>Comment is required</p>
              )}
            </div>

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

export default CommentModal;

// const UserRoleModal = ({ id, reload, setReload }) => {
//   const [modalIsOpen, setIsOpen] = React.useState(false);

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();

//   function openModal() {
//     setIsOpen(true);
//   }

//   function afterOpenModal() {
//     // references are now sync'd and can be accessed.
//     // subtitle.style.color = "#f00";
//   }

//   function closeModal() {
//     setIsOpen(false);
//   }

//   const onSubmit = (data) => {
//     const role = data.contestType;

//     const info = {
//       role,
//     };
//     // console.log(role);

//     // console.log(id);

//     // axios
//     //   .put(`${import.meta.env.VITE_URL}/editRole/${id}`, role)
//     //   .then((res) => {
//     //     if (res.data.modifiedCount > 0) {
//     //       toast.success("Successfully Edited");
//     //     }
//     //   })
//     //   .catch((err) => console.error(err));

//     fetch(`${import.meta.env.VITE_URL}/editRole/${id}`, {
//       method: "PUT",
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify(info),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.modifiedCount > 0) {
//           toast.success("Role Updated");
//           setReload(!reload);
//         }
//       });

//     setIsOpen(false);
//   };

//   return (
//     <div>

//     </div>
//   );
// };

// export default UserRoleModal;
