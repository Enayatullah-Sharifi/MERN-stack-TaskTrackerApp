import express from "express";
import { checkbox, createTask, deleteTask, getTask, getTasks, updateTask } from "../controller/taskController.js";

const router = express.Router();

router.route('/').post(createTask).get(getTasks)

router.route('/:id').get(getTask).delete(deleteTask).put(updateTask)

router.put('/checkbox/:id', checkbox)

export default router;
