import { TopNavBar } from "../Components/TopNavBar";
import React, { useState } from "react";
import axios from "axios";
import { TaskRoomForm} from "../Components/TaskRoomForm";


export const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [taskRooms, setTaskRooms] = useState([]);

  const handleAddTaskRoom = (newTaskRoom) => {
    setTaskRooms([...taskRooms, newTaskRoom]);
  };

  return (
    <div className="w-full h-screen bg-customBg">
      <TopNavBar username={"SujalAdmin"}></TopNavBar>
      <TaskRoomForm></TaskRoomForm>
      {/* <h1>is this working</h1> */}
      <button onClick={() => setShowForm(true)} className="absolute bottom-4 right-4 bg-customColorLight text-white shadow-md p-4 rounded-md z-50 hover:bg-customColor">
        Add Task Room +
      </button>
    </div>
  );
};
