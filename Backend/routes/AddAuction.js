const Verify_User = require("../helper/Verify_User")
const itemModel = require('../model/Item')



module.exports = async function(req,res){


    const Cookie = req.body.Cookie

    // Verying the Token is Valid For Not
    const Verify = await Verify_User(Cookie)

    if (Verify.VerifyToken == false){
        return res.send({Status:false,message:"Invalid User Token"})
    }

    // console.log(Verify)
    const SellerID = Verify.userid

    try {

        const itemcreated =await itemModel.create({Name:req.body.ItemName,
                                                    Description:req.body.ItemDesc,
                                                    SellerID:SellerID,
                                                    StartBid:req.body.ItemStartBid,
                                                    EndTime:req.body.ItemTime,
                                                    CurrentBid:{
                                                        Amount:req.body.ItemStartBid,
                                                        BidderID:SellerID
                                                    },
                                                    Online:true,
                                                    transactionStatus:'Pending',
                                                    Message:[{user:'Admin',message:'Auction Started'}]
                                                    })


        console.log(itemcreated)
        res.send({Status:true,message:"Added to Auction."})
        
    } catch (error) {
        console.log(error)
        return res.send({Status:false,message:"Server Error"})
        
    }



  






}