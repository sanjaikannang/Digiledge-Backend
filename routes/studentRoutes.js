import express from "express";

import { createStudent, deleteStudent, getAllStudents, getStudents, getstudentdetails, updateStudent } from "../controllers/studentControllers.js";
import auth from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/create-student", auth, createStudent);
router.get("/get-student", auth, getStudents);
router.put("/edit-student/:id", auth, updateStudent);
router.delete("/delete-student/:id", auth, deleteStudent);
router.get("/get-all-students", getAllStudents); 
router.get("/get-student/:id",auth,getstudentdetails);

export default router;