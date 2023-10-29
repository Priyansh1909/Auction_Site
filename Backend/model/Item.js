const { ObjectId } = require('bson')
const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    Name: String,
    Description: String,
    SellerID: ObjectId,
    transactionStatus:String,
    SoldTO:ObjectId,
    FinalBid:{
        Amount:Number,
        BidderID:ObjectId
    },
    StartBid:Number,
    CurrentBid:{
        Amount:Number,
        BidderID:ObjectId
    },
    EndTime:Date,
    Online:Boolean,
    Message:[]
})

module.exports = mongoose.model('Items',ItemSchema)