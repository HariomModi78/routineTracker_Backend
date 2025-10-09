const Task = require("../models/Task");
const UserProgress = require("../models/UserProgress");
exports.getTodayAndTomorrowTasks = async (req,res)=>{
    try{
        const today = new Date();
        const startOfToday = new Date(today.setHours(0, 0, 0, 0));
        const endOfToday = new Date(today.setHours(23, 59, 59, 999));

        const todayTasks = await Task.find({
        createdAt: { $gte: startOfToday, $lte: endOfToday }
        });

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const startOfTomorrow = new Date(tomorrow.setHours(0, 0, 0, 0));
        const endOfTomorrow = new Date(tomorrow.setHours(23, 59, 59, 999));

        const tomorrowTasks = await Task.find({
            createdAt: { $gte: startOfTomorrow, $lte: endOfTomorrow }
        });
        res.status(200).json({todayTasks,tomorrowTasks});
    }catch(e){
        res.status(500).json({error:e.message});
    }
}

exports.setTask = async(req,res)=>{
    try{
        const {task,date} = req.body;
        await Task.create({
            userId:req.params.userId,
            task:task,
            createdAt:date
        })
        res.status(201).json({message:"task created successfull"});
    }catch(e){
        res.status(500).json({error:e.message});
    }
}

exports.markCompleted = async(req,res)=>{
    try{
       const task =  await Task.findOneAndUpdate({_id:req.params.taskId},{
            isCompleted:true
        })
        const today = task.createdAt.toLocaleDateString();
        console.log(today);
        const userProgress = await UserProgress.findOne({userId:req.params.userId});
        console.log(userProgress);
        const todayProgress = userProgress.chart.find((val)=>val.hasOwnProperty(today));
        console.log(todayProgress);
        if(todayProgress){
            const currentVal = todayProgress[today]; // access current key need update
            console.log(currentVal,"current val is this ")
            todayProgress[today] = currentVal+1;
        }else{
            userProgress.chart.push({[today]:1})
        }
        await userProgress.save();
        res.status(201).json({message:"task completed successfully"});
    }catch(e){
        res.status(500).json({error:e.message});
    }
}
exports.deleteTask = async(req,res)=>{
    try{
        await Task.findOneAndDelete({_id:req.params.taskId});
        res.status(201).json({message:"task deleted successfully"});
    }catch(e){
        res.status(500).json({error:e.message});
    }

}
