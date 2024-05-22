import { TopNavBar } from "../Components/TopNavBar";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { TaskRoomForm } from "../Components/TaskRoomForm";
// import { plus } from "@heroicons/react/24/solid";

export const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [buttonIcon, setButtonIcon] = useState(faPlus);

  return (
    <div className="w-full h-screen bg-customBg">
      <TopNavBar username={"SujalAdmin"}></TopNavBar>
      {/* <TaskRoomForm></TaskRoomForm> */}
      {showForm ? <TaskRoomForm></TaskRoomForm> : null}
      {/* <h1>is this working</h1> */}
      <button
        onClick={() => {
          setShowForm(!showForm);
        }}
        className="transition duration-100 ease-in-out min-w-48 flex justify-center items-center gap-1 font absolute bottom-4 right-4 bg-customSideColor hover:bg-customSideColorDark text-black shadow-md p-4 rounded-md z-50 hover:bg-customColor"
      >
        <span className="font-bold " >{showForm ? "Cancel Task Room" : "Insert Task Room"}</span>
        <FontAwesomeIcon className="font-bold " icon={showForm ? faTimes : faPlus} />
      </button>
    </div>
  );
};
