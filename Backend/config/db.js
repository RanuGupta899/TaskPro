const mongoose=require('mongoose');
const connectDB=async()=>{
    if(!process.env.MONGO_URI){
        console.error('Error:MONGO_URI is not defined in .env');
        process.exit(1);

    }
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDb Connected:${conn.connection.host}`);

    }
    catch(error){
        console.error(`Database connection :${error.message}`);
    }
};
module.exports=connectDB;