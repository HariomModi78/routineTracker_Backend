const express = require("express");
const { getTodayAndTomorrowTasks, setTask, markCompleted, deleteTask } = require("../controllers/taskController");
const router = express.Router();

router.get("/getTodayAndTomorrowTasks/:userId",getTodayAndTomorrowTasks);
router.post("/setTask/:userId",setTask);
router.put("/markCompleted/:taskId/:userId",markCompleted);
router.delete("/deleteTask/:taskId",deleteTask);


module.exports = router;