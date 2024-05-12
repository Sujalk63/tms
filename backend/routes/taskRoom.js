const express = require("express");
const zod = require("zod");
const { User, Employee, TaskRoom, Tasks } = require("../models/schema");
const router = express.Router();

module.exports = router;

const taskSchema = zod.object({
  taskTitle: zod.string().min(3).max(50),
  taskDescription: zod.string().min(10).max(200),
  taskStatus: zod.enum(["stuck", "completed", "incomplete"]),
  priority: zod.enum(["high", "medium", "low"]),
});

// creating new taskRoom
router.post("/newtaskroom", async (req, res) => {
  try {
    const { roomName, description } = req.body;

    const existingTaskRoom = await TaskRoom.findOne({
      roomName: roomName,
    });

    if (existingTaskRoom) {
      res.status(401).json({
        message: "a room with the same name already exists",
      });
    }

    const newTaskRoom = await TaskRoom.create({ roomName, description });

    res.status(201).json({
      message: "Task room created successfully",
      taskRoom: newTaskRoom,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error creating task room",
      error: err.errors,
    });
  }
});

// getting all the rooms
router.get("/rooms", async (req, res) => {
  try {
    const taskRooms = await TaskRoom.find();

    res.status(200).json(taskRooms);
  } catch (err) {
    res.status(500).json({ error: err.errors });
  }
});

// adding employees to the taskRoom
router.post("/addEmployeesToRoom", async (req, res) => {
  try {
    const { roomId, employeeId } = req.body;

    const taskRoom = await TaskRoom.findById(roomId);
    if (taskRoom.employees.includes(employeeId)) {
      return res
        .status(400)
        .json({ error: "Employee already present in the task room" });
    }

    // Find the task room by ID and update it to push the new employee ID
    const updatedTaskRoom = await TaskRoom.findByIdAndUpdate(
      roomId,
      {
        $push: { employees: employeeId },
      },
      { new: true }
    ); // Set {new: true} to return the updated document

    res.status(200).json({
      message: "Employee added to task room",
      employees: updatedTaskRoom.employees,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// displaying all employees with same room id
router.post('/employees', async (req, res) => {
    try {
      const { taskRoomId } = req.body;
  
      // Find the task room by ID and populate the 'employees' field to get employee details
      const taskRoom = await TaskRoom.findById(taskRoomId).populate('employees');
  
      if (!taskRoom) {
        return res.status(404).json({ message: 'Task room not found' });
      }
  
      const employees = taskRoom.employees;
  
      res.status(200).json({ employees });
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// creating tasks inside the taskroom
router.post("/createTasks", async (req, res) => {
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
    // const tasks = await Tasks.find();
    const { taskRoomId } = req.body;
    const taskRoom = await TaskRoom.findById(taskRoomId).populate("tasks");
    // const taskRoom = await TaskRoom.findById(taskRoomId).populate({
    //   path: "tasks",
    //   select: "taskTitle taskDescription taskStatus priority", // Selecting only the fields you want to display
    // });

    const tasksId = taskRoom.tasks;

    const tasks = await Tasks.find({
      _id: { $in: tasksId }, // Using $in operator to find tasks with IDs in the tasksId array
    });

    res.status(200).json({tasks});
  } catch (err) {
    res.status(400).json({
      error: err.errors,
    });
  }
});

// notes: in the taskRoom schema we havent refrenced the task onjectId with the task Schema, then how while getting all task by "/task" route is populating the tasks field of taskRoomName, this is beacuse while creating the task we are pushing the task id to the particular TaskRoomId and later its getting populated, its also possible for employees.
