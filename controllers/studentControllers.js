import Student from "../models/studentModel.js";
import User from "../models/authModel.js";

// Create a new student
export const createStudent = async (req, res) => {
    const { studentname, course, batch, attendence, taskscore, assessment, project} = req.body;
  const userId = req.userId;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Create a new student associated with the user
    const newStudent = await Student.create({
      studentname,
      course,
      batch,
      attendence,
      taskscore,
      assessment,
      project,
      createdBy: userId, 
    });

    res.status(201).json(newStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all students for the logged-in user
export const getStudents = async (req, res) => {
  const userId = req.userId;

  try {
    const students = await Student.find({ createdBy: userId });
    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a student (checking ownership)
export const updateStudent = async (req, res) => {
  const { studentname, course, batch,attendence, taskscore, assessment, project } = req.body;
  const studentId = req.params.id;
  const userId = req.userId;

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    if (student.createdBy.toString() !== userId) {
      return res.status(403).json({ message: "You are not authorized to edit this student." });
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { studentname, course, batch,attendence, taskscore, assessment, project },
      { new: true }
    );

    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a student (checking ownership)
export const deleteStudent = async (req, res) => {
  const studentId = req.params.id;
  const userId = req.userId;

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    if (student.createdBy.toString() !== userId) {
      return res.status(403).json({ message: "You are not authorized to delete this student." });
    }

    await Student.findByIdAndDelete(studentId);
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all students (without authentication)
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getstudentdetails = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
