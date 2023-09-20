const mongoose=require('mongoose')


const TaskSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'provide a name'],
        trim:true,
        maxlength:[20,'name size limit 20']
    },
    completed:{
        type:Boolean,
        default:false
    }
})


module.exports=mongoose.model('Task',TaskSchema) 