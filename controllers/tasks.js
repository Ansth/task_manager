const Task=require('../models/task')
const asyncWrapper=require('../middleware/async')

const getAllTasks=asyncWrapper(async(req,res)=>{     //here we have use asyncwrapper to remove try catch 
    // try {
        const tasks=await Task.find({})   //find is used to get every item
        res.status(200).json({tasks})
})
        // res.status(201).json({tasks,amount:tasks.length})  based on legth we can get tasks -types of response we can give is totally 3, 2 shown here 1 is normally written in other functions
    //     res.status(200).json({status:"success",data:{tasks,nbHits:tasks.length}})
    // } catch (error) {
    //     res.status(500).json({msg:error});
    // }
    

const createTask=asyncWrapper(async(req,res)=>{
        const task=await Task.create(req.body)       //creates in mongodb 
    res.status(201).json({task})
})
const getTask=asyncWrapper(async(req,res,next)=>{
        const {id:taskID}=req.params;
        const task=await Task.findOne({_id:taskID})
        if(!task)
        {
            const error=new Error('Not Found')
            error.status=404;
            return next(error)
            return res.status(404).json({msg:`no task with id:${taskID}`})
        }
        res.status(200).json({task})

})
const updateTask=asyncWrapper(async(req,res)=>{
        const {id:taskID}=req.params;
        const task=await Task.findOneAndUpdate({_id:taskID},req.body,
            {new:true,runValidators:true,
            overwrite:true })

        if(!task)
        {
        
            return res.status(404).json({msg:`no task with id:${taskID}`})
        }
        res.status(200).json({task});
})




const deleteTask=asyncWrapper(async(req,res)=>{
        const {id:taskID}=req.params;
        const task=await Task.findByIdAndDelete({_id:taskID})
        if(!task){
            return res.status(404).json({msg:`no task with id:${taskID}`})
        }
        res.status(200).json({task})             //here  we can use any 3 below lines to get the status if it not null
        // res.status(200).send()
        // res.status(200).json({task:null,status:'sucess'})
    
})

 


module.exports={
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
}