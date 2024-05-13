const mongoose = require("mongoose");
const { Schema } = require("mongoose");

// user schema with 2 roles

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "employee"], //chosse any one value out of two
      required: true,
    },
  },
  { timestamps: true }
);

// task Room Schema with tasks

const taskRoomSchema = new Schema({
  roomName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  tasks: [],
  employees: [
    {
      type: Schema.Types.ObjectId,
      ref: "Users", // becuz we need the userId of the employee not the employee id, this is necessary for getting all the rooms in which the employee is added, we signed userId for jwt and not specifically employye schema's objectId so if passed ref as employees we wont be able to get the rooms in which the employee is added 
    },
  ],
});

// task Schema
const tasksSchema = new Schema({
  taskTitle: {
    type: String,
    required: true,
  },
  taskDescription: {
    type: String,
    required: true,
  },
  taskStatus: {
    type: String,
    required: true,
    enum: ["stuck", "completed", "incomplete"],
  },
  priority: {
    type: String,
    required: true,
    enum: ["high", "medium", "low"],
  },
  taskRoomId: {
    type: Schema.Types.ObjectId,
    ref: "TaskRoom",
  },
});

// Employees Schema

const employeeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  taskRoom: {
    type: Schema.Types.ObjectId,
    ref: "TaskRoom",
  },
});

const User = mongoose.model("User", userSchema);
const TaskRoom = mongoose.model("TaskRoom", taskRoomSchema);
const Employee = mongoose.model("Employee", employeeSchema);
const Tasks = mongoose.model("Tasks", tasksSchema);

module.exports = {
  User: User,
  TaskRoom: TaskRoom,
  Employee: Employee,
  Tasks: Tasks,
};
