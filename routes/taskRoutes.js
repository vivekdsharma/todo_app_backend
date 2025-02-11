const express = require("express");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
    try{
        const tasks = await Task.find({ user: req.user.id });
        return res.json(tasks);
    }
    catch(error){
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
})


router.post("/", authMiddleware, async (req, res) => {
    console.log("🛠️ Debugging User in Task Route:", req.user);

    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required!" });
        }

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized! User not found." });
        }

        const newTask = new Task({ title, user: req.user.id }); // ✅ FIXED
        await newTask.save();

        return res.json(newTask);
    } catch (error) {
        console.error("Task Creation Error:", error);
        return res.status(500).json({ message: "Server Error" });
    }
});


router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        task.completed = !task.completed;
        await task.save();
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});



router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});




module.exports = router;