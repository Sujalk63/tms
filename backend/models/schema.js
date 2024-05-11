const mongoose = require("mongoose");
const {Schema} = require("mongoose");

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
  tasks: [
    {
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
      }
    },
  ],
  employees: [
    {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
  ],
});

// Employees Schema 

const employeeSchema = new Schema({
  username: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  taskRoom: {
    type: Schema.Types.ObjectId,
    ref: "TaskRoom",
  },
});



const User = mongoose.model("User", userSchema);
const TaskRoom = mongoose.model("TaskRoom", taskRoomSchema);
const Employee = mongoose.model("Employee", employeeSchema);

module.exports = {
  User: User,
  TaskRoom: TaskRoom,
  Employee: Employee,
};
