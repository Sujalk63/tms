import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTimes } from "@fortawesome/free-solid-svg-icons";

export const TaskRoomForm = ({ onClose, onSuccess, setRoomAlert }) => {
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/taskroom/newtaskroom",
        {
          roomName,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Set the Authorization header
          },
        }
      );
      const message = response.data.message;
      console.log(message);
      if (response.data) {
        setRoomAlert(message);
        onSuccess();
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const message = error.response.data.message;
        console.log(message);
        setRoomAlert(message);
      } else {
        console.log("An unexpected error occurred:", error);
        setRoomAlert("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/5 p-8 rounded-lg bg-customColor flex-col items-center justify-center ">
      <button onClick={onClose} className="absolute top-1 right-2 text-white">
        <FontAwesomeIcon className="text-lg" icon={faTimes} />
      </button>
      <h2 className="text-lg font-bold pb-1 mb-7 ml-auto mr-auto text-white w-1/2 border-b-4 border-customSideColor text-center">
        Create <br /> Task Room
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            id="roomName"
            autoComplete="off"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className="border border-gray-700 rounded-lg px-4 py-3 w-full bg-customColorLight placeholder-gray focus:outline-none text-white"
            required
            placeholder="Room Name"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            id="description"
            autoComplete="off"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-700 rounded-lg px-4 py-3 w-full bg-customColorLight placeholder-gray focus:outline-none text-white"
            placeholder="Description"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-customSideColor hover:bg-customSideColorDark text-black font-semibold py-3 px-4 rounded-lg w-full"
        >
          Create Room
        </button>
      </form>
    </div>
  );
};
