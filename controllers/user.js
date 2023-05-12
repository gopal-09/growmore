const User=require('../models/user')
const Task=require('../models/task')
//login,deletetask,updatetask,signup,createtask
const { check, validationResult } = require("express-validator");
 const bcrypt =  require('bcryptjs')

const createtask=async(req, res) => {
    try{
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      completed: false,
    });
    await task.save()
    return  res.json({task: task})
}
    catch(err){
        console.log(err);
        return res.status(500).json({msg:'Server Error'});
    }
   }
   const signup= async (req,res,next) => {
    const{name,email,password}=req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty())
    return res.json({"errors": errors})
    else{
     let existingUser;
     try {
         existingUser = await User.findOne({name}) 
         }
         catch (error) {
             console.log(error);
         } 
         if(existingUser) {
            //console.log(existingUser)
              return res.json({message:'user exist'})  
         }
         else{
         const hashedPassword=bcrypt.hashSync(password)
         const user=new User({
                name,
                email,
                password:hashedPassword
                
         }) ;
         
         try {
             await user.save();
         }
         catch (error) {
             console.log(error);
         }
         const token =JWT.sign({email}, "nfb32iur32ibfqfvi3vf932bg932g", {expiresIn: 360000});
        //console.log(token);
          return res.status(200).json({user: user,token: token})
        }
    }
}

login= async (req, res) => {
    const{email,password}=req.body;
        let user;
        try {
            user = await User.findOne({email})
            //let isMatch = await bcrypt.compare(req.body.password,user.password);
        }
        catch (error) {
            console.log(error);
        }
        if(!user) {
           return res.json({message: "User not found"})
        }
        else{
        const isPasswordCorrect=bcrypt.compareSync(password, user.password)
        if(!isPasswordCorrect)
        {
                return res.status(200).json({message:"Incorrect password"})
        }
        else{
            const token =JWT.sign({email}, "nfb32iur32ibfqfvi3vf932bg932g", {expiresIn: 360000});
             //console.log(token);
        
            
        return res.status(200).json({message:"login success",token:token})}}
    }
const getalltasks=async(req, res) => {
        Task.find()
          .then((tasks) => res.status(200).json(tasks))
          .catch((error) => res.status(400).json({ error }));
      }
const updatetask= async(req, res) => {
    Task.findByIdAndUpdate(req.params.id, req.body)
      .then(() => res.status(200).json({ message: 'Task updated successfully' }))
      .catch((error) => res.status(400).json({ error }));
  }
const deletetask=async(req, res) => {
    Task.findByIdAndRemove(req.params.id)
      .then(() => res.status(200).json({ message: 'Task deleted successfully' }))
      .catch((error) => res.status(400).json({ error }));
  }
  const logout=async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()

}}

  module.exports ={createtask,signup,login,getalltasks,updatetask,deletetask,logout}