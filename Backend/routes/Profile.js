const Verify_User = require('../helper/Verify_User')
const UserModel = require('../model/User')


module.exports = async function(req,res){

    console.log("here")
    console.log(req.body)

    const Cookie = req.body.Cookie

    // Verying the Token is Valid For Not
    const Verify = await Verify_User(Cookie)

    if (Verify.VerifyToken == false){
        return res.send({Status:false,message:"Invalid User Token"})
    }

    const ProfileId = Verify.userid

    try {

        const profileData = await UserModel.findById(ProfileId)

        console.log(profileData)

        profileToSend = {
            Name:profileData.Name,
            Email:profileData.Email,
            Wallet:profileData.Wallet
        }

        return res.send({Status:true,data:profileToSend})

        
    } catch (error) {

        console.log(error)
        return res.send({Status:false,message:"Server Error"})
        
    }
}