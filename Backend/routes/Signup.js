const Hashing_Password = require('../helper/Hashing_Password')
const users = require('../model/User')


module.exports = async function(req,res){
    console.log(req.body)

    //ReValidate Data received from Frontend

    if(req.body.Name == ''){
        return res.send({Status:false,message:"Name is Empty."})
    }
    else if (req.body.Email == ''){
        return res.send({Status:false,message:'Email is Empty.'})
    }
    else if (req.body.Password <= 7){
        return res.send({Status:false,message:"Password should be greater than 7 letters"})
    }
    else if (req.body.Password != req.body.ConfirmPassword){
        return res.send({Status:false,message:"Password Does not Match."})
    }
    //Checking if Email ALready Exists 
    
    check_Email = await users.find({Email:req.body.Email})

    if (check_Email.length != 0 ){
        return res.send({Status:false,message:"Email Already Exists."})
    }
    else{
    
    // Insert User into the Database
        const hashPassword = await Hashing_Password(req.body.Password)

        console.log(hashPassword)

        await users.create({Name:req.body.Name,Email:req.body.Email, Password:hashPassword,Wallet:0})

        res.send({Status:true,message:"Register Successfulyy.."})

    }


}