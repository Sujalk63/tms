const express = require("express");
const zod = require("zod");
const { User, Employee, TaskRoom, Tasks } = require("../models/schema");
const router = express.Router();
const { isAdmin } = require("../middleware/isAdmin");
const { authMiddleware } = require("../middleware/authMiddleware");

module.exports = router;

const taskSchema = zod.object({
  taskTitle: zod.string().min(3).max(50),
  taskDescription: zod.string().min(10).max(200),
  taskStatus: zod.enum(["stuck", "completed", "incomplete"]),
  priority: zod.enum(["high", "medium", "low"]),
});

// creating new taskRoom
router.post("/newtaskroom", authMiddleware, isAdmin, async (req, res) => {
  try {
    const { roomName, description } = req.body;

    // if (!success) {
    //   res.status(400).json({
    //     message: "Invalid format",
    //   });
    // }

    const existingTaskRoom = await TaskRoom.findOne({
      roomName: roomName,
    });

    if (existingTaskRoom) {
      return res.status(401).json({
        message: "A room with the same name already exists",
      });
    }

    const newTaskRoom = await TaskRoom.create({ roomName, description });

    console.log(newTaskRoom);

    if (newTaskRoom) {
      res.status(200).json({
        message: "Task room created successfully",
      });
    }
  } catch (err) {
    console.error("error occured: ", err);
    res.status(400).json({
      message: err.errors,
    });
  }
});

// getting all the rooms
router.get("/rooms", authMiddleware, async (req, res) => {
  try {
    if (req.user.role == "admin") {
      console.log(req.userId);
      const taskRooms = await TaskRoom.find();
      res.status(200).json(taskRooms);
    } else if (req.user.role === "employee") {
      const taskRooms = await TaskRoom.find({ employees: req.user._id });
      res.status(200).json(taskRooms);
    } else {
      res.status(403).json({ error: "Unauthorized access" });
    }
  } catch (err) {
    res.status(500).json({ error: err.errors });
  }
});

// adding employees to the taskRoom
router.post("/addEmployeesToRoom", isAdmin, async (req, res) => {
  try {
    const { taskRoomId, userId } = req.body;

    const taskRoom = await TaskRoom.findById(taskRoomId);
    if (taskRoom.employees.includes(userId)) {
      return res
        .status(400)
        .json({ error: "Employee already present in the task room" });
    }

    // Find the task room by ID and update it to push the new employee ID
    const updatedTaskRoom = await TaskRoom.findByIdAndUpdate(
      taskRoomId,
      {
        $push: { employees: userId },
      },
      { new: true }
    ).populate("employees"); // Set {new: true} to return the updated document

    res.status(200).json({
      message: "Employee added to task room",
      employees: updatedTaskRoom.employees,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// displaying all employees with same room id
router.post("/employees", async (req, res) => {
  try {
    const { taskRoomId } = req.body;

    const taskRoom = await TaskRoom.findById(taskRoomId).populate({
      path: "employees",
      select: "username", // Selecting only the username field
    });

    if (!taskRoom) {
      return res.status(404).json({ message: "Task room not found" });
    }

    const employees = taskRoom.employees;

    res.status(200).json(employees);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// creating tasks inside the taskroom
router.post("/createTasks", isAdmin, async (req, res) => {
  try {
    const { taskTitle, taskDescription, taskStatus, priority, taskRoomId } =
      req.body;

    const task = await Tasks.create({
      taskTitle,
      taskDescription,
      taskStatus,
      priority,
      taskRoomId,
    });

    await TaskRoom.findByIdAndUpdate(taskRoomId, {
      $push: { tasks: task._id }, // Assuming tasks is the name of the array field in TaskRoom
    });

    res.status(201).json({ message: "Task created successfully" });
  } catch (err) {
    res.status(400).json({
      error: err.errors,
    });
  }
});

// getting tasks
router.post("/tasks", async (req, res) => {
  try {
    const { taskRoomId } = req.body;
    const taskRoom = await TaskRoom.findById(taskRoomId).populate("tasks");

    const tasksId = taskRoom.tasks;

    const tasks = await Tasks.find({
      _id: { $in: tasksId }, // Using $in operator to find tasks with IDs in the tasksId array
    });

    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json({
      error: err.errors,
    });
  }
});

// notes: in the taskRoom schema we havent refrenced the task onjectId with the task Schema, then how while getting all task by "/task" route is populating the tasks field of taskRoomName, this is beacuse while creating the task we are pushing the task id to the particular TaskRoomId and later its getting populated, its also possible for employees.

// delete routes

// delete taskRoom
router.delete("/deleteTaskRoom", isAdmin, async (req, res) => {
  try {
    const { roomId } = req.body;

    const deletedRoom = await TaskRoom.findByIdAndDelete(roomId);

    if (!deletedRoom) {
      return res.status(404).json({ error: "Task room not found" });
    }

    res.status(200).json({ message: "Task room deleted successfully" });
  } catch (err) {
    console.error("Error deleting task room:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// delete employee
router.delete("/deleteEmployee", isAdmin, async (req, res) => {
  try {
    const { userId, taskRoomId } = req.body;

    // Step 1: Remove the employee from the employees array of the TaskRoom
    const updatedTaskRoom = await TaskRoom.findByIdAndUpdate(
      taskRoomId,
      { $pull: { employees: userId } }, // Use $pull to remove the employeeId from the array
      { new: true }
    );

    if (!updatedTaskRoom) {
      return res.status(404).json({ error: "Task room not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error("Error deleting employee:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/deleteTaskFromRoom", isAdmin, async (req, res) => {
  try {
    const { taskId, taskRoomId } = req.body;

    // Find the task room by ID
    const taskRoom = await TaskRoom.findById(taskRoomId);

    if (!taskRoom) {
      return res.status(404).json({ error: "Task room not found" });
    }

    // Remove the task from the tasks array of the task room
    const updatedTaskRoom = await TaskRoom.findByIdAndUpdate(
      taskRoomId,
      { $pull: { tasks: taskId } },
      { new: true }
    );

    if (!updatedTaskRoom) {
      return res.status(404).json({ error: "Task not found in the task room" });
    }

    const deletedTask = await Tasks.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res
        .status(404)
        .json({ error: "Task not found in the Tasks collection" });
    }

    res.status(200).json({
      message: "Task deleted from the task room ans task successfully",
    });
  } catch (err) {
    console.error("Error deleting task from task room:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// update routes for admin and emplyee

router.put("/updateTaskDetails", isAdmin, async (req, res) => {
  try {
    const { taskId, priority, title, description } = req.body;

    const updatedTask = await Tasks.findByIdAndUpdate(
      taskId,
      { priority, title, description },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({
      message: "Task details updated successfully",
      task: updatedTask,
    });
  } catch (err) {
    console.error("Error updating task details:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/updateTaskStatus", async (req, res) => {
  try {
    const { taskId, status, description } = req.body;

    const updatedTask = await Tasks.findByIdAndUpdate(
      taskId,
      { taskStatus: status, $set: { taskDescription: description } },
      { new: true } // Set {new: true} to return the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res
      .status(200)
      .json({ message: "Task status updated successfully", task: updatedTask });
  } catch (err) {
    console.error("Error updating task status:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//   {
//     "message": "user created succesfully",
//     "user": {
//         "username": "admin",
//         "role": "admin"
//     },
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjQ0M2VhODIzMWZmZWE4Njk2N2ZkNTMiLCJpYXQiOjE3MTU3NDg1MjB9.pgKdXlYHuDgeC_PsgcQsFgNE5Z1p59tR949W6gPVJUU"
// }

// {
//     "message": "user created succesfully",
//     "user": {
//         "username": "admin2",
//         "role": "admin"
//     },
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjQ0NDBhN2U3YmZiM2M1YmQ5ODc1ZTAiLCJpYXQiOjE3MTU3NDkwMzF9.nVHnjEzoDjXtf2C091DqKGCfny-W1Lr2-gHK-y0CwXk"
// }

// {
//     "message": "user created succesfully",
//     "user": {
//         "username": "adyaSujal",
//         "role": "employee"
//     },
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjQ0NDFkYzc5NDEzMWE4NWM2OWYwMGUiLCJpYXQiOjE3MTU3NDkzNDB9.-MR-3ycxAGAz-D0qwTKnsXWMjsbd-kiR9Vw0mqYzBDg"
// }

// {
//   "message": "user created succesfully",
//   "user": {
//       "username": "sujalkarmakar",
//       "role": "employee"
//   },
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjQ0OGZmYTRlMmI0MGM5ZTgxZTcyODAiLCJpYXQiOjE3MTU3NjkzMzh9.bPaCLYTnmlqFGm-P2JKJ6w2idSstktPPMWZeF8Ro3hI"
// }

// things left in the backend
// update the task fields by the admin
// update task status by employee and add a description of the task
