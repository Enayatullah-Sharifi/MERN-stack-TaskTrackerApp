import Task from "../model/Task.js";

export const createTask = async (req, res) => {
  try {
    const { task } = req.body;
    if (!task) {
      return res.status(400).json({ message: "Task is required" });
    }
    const newTask = await Task.create({ task });

    res.status(201).json(newTask);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}).sort({ createdAt: -1 });
    if (!tasks) {
      return res.status(404).json({ message: "No task found" });
    }

    res.status(200).json(tasks);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findOne({ _id: id });

    if (!task) {
      return res.status(404).json({ message: "No task found" });
    }

    res.status(200).json(task);
  } catch (err) {
    console.log(err);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "No task found" });
    }
    res.status(500).json({ message: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id });
    if (!task) {
      return res.status(404).json({ message: "No task found" });
    }
    const removeTask = await Task.deleteOne(task);
    if (!removeTask.acknowledged) {
      return res.status(400).json({ message: "Error while deleting task" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.log(err);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "No task found" });
    }
    res.status(500).json({ message: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      { _id: req.params.id },
      task,
      { new: true }
    );
    if (!updatedTask) {
      return res.status(400).json({ message: "Error while updating task" });
    }
    res.status(200).json(updatedTask);
  } catch (err) {
    console.log(err);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "No task found" });
    }
    res.status(500).json({ message: err.message });
  }
};

export const checkbox = async (req, res) => {
  try {
    const id = req.params.id;
    const value = req.body;
    
    const task = await Task.findOne({ _id: id });
    if (!task) {
      return res.status(404).json({ message: "No task found" });
    }

    const t = Object.values(value);
    if (t[0] === true) {
      task.isCompleted = false;
    } else {
      task.isCompleted = true;
    }
    await task.save();
    res.status(200).json({ message: task });

  } catch (err) {
    console.log(err);
    if (err.kind === "ObjectId")
      res.status(404).json({ message: "No task found" });
    res.status(500).json({ message: err.message });
  }
};
