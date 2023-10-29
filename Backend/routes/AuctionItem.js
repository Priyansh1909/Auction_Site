const itemModel = require('../model/Item')
const Verify_User = require("../helper/Verify_User")
const Transaction_Process = require('../helper/Transaction_Process')



module.exports = async function(req,res){

    const Cookie = req.body.Cookie

    // Verying the Token is Valid For Not
    const Verify = await Verify_User(Cookie)

    if (Verify.VerifyToken == false){
        return res.send({Status:false,message:"Invalid User Token"})
    }

    const SellerID = Verify.userid
    const ItemId = req.body.AuctionID
    const Email = Verify.Email


    try {

        const ItemData = await itemModel.findById(ItemId)

        const timeNow = new Date()
    

        console.log(ItemData)

        if (ItemData.Online == true){

            const responsesDate = {
                Name:ItemData.Name,
                Description:ItemData.Description,
                StartBid:ItemData.StartBid,
                CurrentBid:ItemData.CurrentBid.Amount,
                Email:Email,
                Message:ItemData.Message
            }


            if (ItemData.EndTime < timeNow){
                console.log("Time Ended")

               
                
                const updateone = await itemModel.updateOne({_id:ItemId},
                    {$set:{'Online':false}})
                
    // After Bid Time is Over Starting the Transaction process
                console.log("hERE")
                await Transaction_Process(ItemId,ItemData.SellerID,ItemData.CurrentBid.Amount,ItemData.CurrentBid.BidderID).then(()=>{

                    return res.send({Status:false ,Online:false})
                }

                    )
                    

            }else{

                return res.send({Status:true,data:responsesDate,Online:true})
            }
    
        }
        else{
            res.send({Status:false ,Online:false})
        }

       


        
    } catch (error) {
        console.log(error)
        // return res.send({Status:false,Online:false,message:"Server Error"})
        
    }

}