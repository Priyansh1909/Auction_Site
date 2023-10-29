const Comparing_Password = require("../helper/Comparing_Password")
const users = require('../model/User')
const jwt = require("jsonwebtoken")
require('dotenv')



module.exports = async function(req,res){

    console.log(req.body)

    // Revalidating Input Value from Frontend

    if (req.body.Email == ''){
        return res.send({Status:false,message:'Email is Empty.'})
    }
    else if (req.body.Password <= 7){
        return res.send({Status:false,message:"Password should be greater than 7 letters"})
    }

    // Checking whether the email exist in DB or not
    check_Email = await users.find({Email:req.body.Email})

    if (check_Email.length != 1 ){
        return res.send({Status:false,message:"Email Does not Exist"})
    }
    else{
    // Checking the Password is Correct or not
        Password_Checking = await Comparing_Password(req.body.Password,check_Email[0].Password)

        if (Password_Checking == false){
            return res.send({Status:false,message:"Incorrect Password"})
        }
        else{
    
    // Setting up Jwt Token for the User
            const Token = jwt.sign({Email:req.body.Email,userid:check_Email[0]._id},process.env.JWT_TOKEN)
            return res.send({message:"Logged In Sucessfully...", Status:true, Token: Token})
        }

    }
}
