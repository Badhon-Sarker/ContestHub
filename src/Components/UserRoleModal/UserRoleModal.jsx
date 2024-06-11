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
    const role = data.contestType

    const info =  {
        role 
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
            setReload(!reload)
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
          <div>I am a modal</div>

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

// import { Fragment, useState } from "react";
// import {
//   Dialog,
//   Listbox,
//   Transition,
//   TransitionChild,
//   DialogTitle,
//   DialogPanel,
//   ListboxButton,
//   ListboxOption,
//   ListboxOptions,
// } from "@headlessui/react";
// import { BsCheckLg } from "react-icons/bs";
// import { AiOutlineDown } from "react-icons/ai";
// const roles = ["user", "creator", "admin"];

// const UserRoleModal = ({ setIsOpen, isOpen, handleModal, user }) => {
//   const [selected, setSelected] = useState([]);
//   console.log(selected)

//   return (
//     <Transition appear show={isOpen} as={Fragment}>
//       <Dialog
//         as="div"
//         className="relative z-10"
//         onClose={() => setIsOpen(false)}
//       >
//         <TransitionChild
//           as={Fragment}
//           enter="ease-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-200"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-black bg-opacity-25" />
//         </TransitionChild>

//         <div className="fixed inset-0 overflow-y-auto">
//           <div className="flex min-h-full items-center justify-center p-4 text-center">
//             <TransitionChild
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <DialogPanel className="w-full h-56 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                 <DialogTitle
//                   as="h3"
//                   className="text-lg font-medium text-center leading-6 text-gray-900"
//                 >
//                   Update User Role
//                 </DialogTitle>

//                 <div>
//                 <div className="w-full">
//               <h1>Contest Type *</h1>

//               <select
//                 className="select select-bordered w-full mb-2"
//                 onChange={setSelected}
//                 name= 'role'
//                 // {...register("contestType", { required: true })}
//               >
//                 <option value={"Image Design"}>Image Design</option>
//                 <option value={"Article Writing"}>Article Writing</option>
//                 <option value={"Marketing Strategy"}>Marketing Strategy</option>
//
//               </select>
//             </div>
//                 </div>

//                 {/* <div className="mt-4 w-full">
//                   <Listbox value={selected} onChange={setSelected}>
//                     <div className="relative mt-1">
//                       <ListboxButton className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
//                         <span className="block truncate">{selected}</span>
//                         <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
//                           <AiOutlineDown
//                             className="h-5 w-5 text-gray-400"
//                             aria-hidden="true"
//                           />
//                         </span>
//                       </ListboxButton>
//                       <Transition
//                         as={Fragment}
//                         leave="transition ease-in duration-100"
//                         leaveFrom="opacity-100"
//                         leaveTo="opacity-0"
//                       >
//                         <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
//                           {roles.map((role, idx) => (
//                             <ListboxOption
//                               key={idx}
//                               className="relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900 data-[focus]:bg-amber-100  data-[focus]:text-amber-900"
//                               value={role}
//                             >
//                               {({ selected }) => (
//                                 <>
//                                   <span
//                                     className={`block truncate ${
//                                       selected ? "font-medium" : "font-normal"
//                                     }`}
//                                   >
//                                     {role}
//                                   </span>
//                                   {selected ? (
//                                     <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
//                                       <BsCheckLg
//                                         className="h-5 w-5"
//                                         aria-hidden="true"
//                                       />
//                                     </span>
//                                   ) : null}
//                                 </>
//                               )}
//                             </ListboxOption>
//                           ))}
//                         </ListboxOptions>
//                       </Transition>
//                     </div>
//                   </Listbox>
//                 </div> */}

//                 <hr className="mt-16 " />

//                 <div className="flex mt-2 justify-center gap-5">
//                   <button
//                     type="button"
//                     className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
//                     onClick={() => handleModal(selected)}
//                   >
//                     Update
//                   </button>
//                   <button
//                     type="button"
//                     className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </DialogPanel>
//             </TransitionChild>
//           </div>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// };

// export default UserRoleModal;
