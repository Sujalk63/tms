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
    const taskRoom = await TaskRoom.findById(taskRoomId).populate({
      path: "tasks",
      select: "taskTitle taskDescription taskStatus priority", // Selecting only the fields you want to display
    });

    const tasksId = taskRoom.tasks

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
