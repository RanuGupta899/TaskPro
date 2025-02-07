const express=require('express');
const dotenv=require('dotenv');
const connectDB=require('./config/db');
const cors=require('cors');
const app=express();
app.use(cors());
dotenv.config();
connectDB();
app.use(express.json());


const userRoute=require('./routes/userRoute');
app.use('/user',userRoute);

const todoRoute=require('./routes/todoRoute');
app.use('/todo',todoRoute);

const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{console.log(`Server is  running on port ${PORT}`);
});


