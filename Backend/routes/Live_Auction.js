const Verify_User = require("../helper/Verify_User")
const itemModel = require('../model/Item')


module.exports = async function(req,res){

    console.log("here")
    console.log(req.body)

    const Cookie = req.body.Cookie

    // Verying the Token is Valid For Not
    const Verify = await Verify_User(Cookie)

    if (Verify.VerifyToken == false){
        return res.send({Status:false,message:"Invalid User Token"})
    }

    const SellerID = Verify.userid


    try {

    // Getting Auction Item from MongoDB which are currently Active
        const Auctionitem = await itemModel.find({Online:true})

        console.log(Auctionitem)

        return res.send({Status:true,Auctionitem:Auctionitem})

        
    } catch (error) {

        console.log(error)
        return res.send({Status:false,message:"Server Error"})
        
    }


}