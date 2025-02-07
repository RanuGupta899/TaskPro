const User=require('../model/usermodel')
const jwt=require("jsonwebtoken");
const signupUser=async(req,res)=>{
    try{
        const{username,email,password}=req.body;
        // reate a new user
        const user=new User({username,email,password});
        await user.save();
        return res.status(200).json({message:'User  Signedup successfully',user:user});
    }
    catch(error){
        console.error('Error:',error.message);
        res.status(500).json({message:'Internal server error'})
    }
};
// Login APi
const loginUser=async(req,res)=>{
    try{
        const{email,password}=req.body;
        // check if user exist
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User not found"});

        }
        if(user.password!==password){
            return res.status(400).json({message:"Invalid credential"});
        }
        // generate Token
        const token=jwt.sign(
            {userId:user._id,email:user.email},
            process.env.JWT_SECRET,
            {expiresIn:'1h'}
        )
        res.status(200).json({message:"Login Successfully",user,token});
    }
    catch(error){
        console.error("error during login",error)
        res.status(500).json({message:"Internal server Error"});
    }
};
module.exports={signupUser,loginUser}
