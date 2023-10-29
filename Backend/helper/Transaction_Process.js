
const mongoose = require('mongoose')
const ItemModel = require('../model/Item')
const UserModel =require('../model/User')




module.exports = async function(ItemID,Seller,Amount,Buyer){

    try {

        const session = UserModel.startSession();
        
        (await session).withTransaction(async ()=>{


    //Subtracting Money from Buyer
            const SubtractMoneyFromBuyer = await UserModel.findByIdAndUpdate(Buyer,{$inc :{Wallet: -Amount}})

            console.log(SubtractMoneyFromBuyer)

            if (SubtractMoneyFromBuyer !==1){
                (await session).abortTransaction();
                return 
            }

    //Adding Money to Seller

            const AddMoneyToSeller = await UserModel.findByIdAndUpdate(Seller,{$inc :{Wallet: Amount}})

            console.log(AddMoneyToSeller)

            if (AddMoneyToSeller !== 1){
                (await session).abortTransaction();
                return
            }

            const ChangingStatus = await ItemModel.findByIdAndUpdate(ItemID,{$set:{SoldTO:Buyer,
                                                                        transactionStatus:'Done',
                                                                        FinalBid:{"Amount": Amount,"BidderID":Buyer}
                                                                    }})
                                                                    
            console.log(ChangingStatus)


        })
        
    } catch (error) {
        console.log(error)
        
    }


}