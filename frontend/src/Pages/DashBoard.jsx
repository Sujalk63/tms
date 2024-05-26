import { TopNavBar } from "../Components/TopNavBar";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { TaskRoomForm } from "../Components/TaskRoomForm";
import { useAuth } from "../AuthContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [isRotated, setIsRotated] = useState(false);
  const [roomAlert, setRoomAlert] = useState("");
  // const { role, userId } = useAuth();
  const { authState } = useAuth();



  useEffect(() => {
    let timeoutId;
    if (roomAlert) {
      timeoutId = setTimeout(() => {
        setRoomAlert("");
      }, 3000);
    }
    return () => clearTimeout(timeoutId);
  }, [roomAlert]);

  const handleButtonClick = () => {
    setShowForm(!showForm);
    setIsRotated(!isRotated);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setIsRotated(false);
  };

  return (
    <div className="w-full h-screen bg-customBg">
      <TopNavBar username={"SujalAdmin"}></TopNavBar>
      {showForm ? (
        <TaskRoomForm
          onClose={handleCloseForm}
          onSuccess={handleCloseForm}
          setRoomAlert={setRoomAlert}
        ></TaskRoomForm>
      ) : null}
      {authState.role === "admin" && (
        <button
          onClick={handleButtonClick}
          className="w-16 h-16 transition duration-100 ease-in-out flex justify-center items-center absolute bottom-10 right-10 bg-customSideColor hover:bg-customSideColorDark text-white p-4 rounded-full z-50"
        >
          <FontAwesomeIcon
            className={`text-5xl transition-transform duration-300 ${
              isRotated ? "rotate-45" : ""
            }`}
            icon={faPlus}
          />
        </button>
      )}
      {roomAlert && (
        <div className="transition duration-200 ease-in-out absolute bottom-[5.5%] right-[8%] bg-customColorLight text-white shadow-md p-4 rounded-md z-50">
          {roomAlert}
        </div>
      )}
    </div>
  );
};
