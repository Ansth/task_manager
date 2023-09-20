const mongoose=require("mongoose")




 

const connectDB=(url)=>{
    console.log("DB")
return mongoose.connect(url)
}



module.exports=connectDB