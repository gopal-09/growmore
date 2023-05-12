const jwt = require('jsonwebtoken')
const User = require('../models/user')
const auth = async (req,res,next)=>{
    try{
        const token = req.header('x-auth')
        //console.log(token)
        const decode = jwt.verify(token,'nfb32iur32ibfqfvi3vf932bg932g')
        const user = await User.findOne({email:decode.email,'tokens.token':token})
        //console.log(user)
        if(!user){
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    }catch(error){
        res.status(401).send({error:'Please authenticate'})
    }
 
}

module.exports = auth