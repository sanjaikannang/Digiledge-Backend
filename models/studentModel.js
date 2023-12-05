import mongoose from "mongoose";

const studentSchema = mongoose.Schema({

  studentname: 
  { 
    type: String, 
    required: true 
  },

  course: 
  { 
    type: String, 
    required: true 
  },

  batch: 
  { 
    type: String, 
    required: true 
  },

  attendence:{
    type: String, 
    required: true 
  },

  taskscore:{
    type: String, 
    required: true 
  },

  assessment:{
    type: String, 
    required: true 
  },

  project:{
    type: String, 
    required: true 
  },
 
  createdBy: 
  { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },

});

export default mongoose.model("Student", studentSchema);