const express = require('express')
const login = require('./routes/login')
const Signup = require('./routes/Signup')
const cors = require('cors')
const AddAuction = require('./routes/AddAuction')
const Live_Auction = require('./routes/Live_Auction')
const AuctionItem = require('./routes/AuctionItem')
const { Socket } = require('socket.io')
const itemModel = require('./model/Item')
const Verify_User = require('./helper/Verify_User')
const { verify } = require('crypto')
const { startSession } = require('mongoose')
const Profile = require('./routes/Profile')
const Auction_History = require('./routes/Auction_History')
const ItemSold = require('./routes/ItemSold')
require('dotenv').config()

//Connecting to MongoDB
require('./MongoDb_Config')

const app = express()

app.use(express.json())
app.use(cors({
    origin: "*",
    credentials: true,
  }))


//Socket Connection

const server = require('http').createServer(app)

const io = require('socket.io')(server,{
    cors:{
        origin:"*",
        credentials: true
    }
});



io.on('connection', (socket) =>{

    console.log("Connected to Socket :" + socket.id)

    socket.on('JoinRoom',(room)=>{
        console.log("Connection for room: "+ room)
        socket.join(room)
    })

    socket.on('SendMessage',async (data)=>{


        socket.in(data.Room).emit('ReceiveMessage',data)

        const UpdatingData = await itemModel.updateOne({_id:data.Room},
            {$push:{Message: {user:data.Email,message:data.Message}
            }
        })

        // console.log(UpdatingData)
      

    })

    socket.on('LeaveRoom',(Roomid)=>{
        socket.leave(Roomid)
    })

    socket.on('SendBid',async (data)=>{

        const Verify = await Verify_User(data.Cookie)
        console.log(Verify)

        const UpdateBid = await itemModel.updateOne({_id:data.Room},
            {$set:{'CurrentBid.Amount':data.Bid,'CurrentBid.BidderID':Verify.userid}})


        socket.in(data.Room).emit('ReceiveBid',{Room:data.Room,Bid:data.Bid})

    })

});





const Port = process.env.Port ||  8000

app.get('/',(req,res)=>{
    res.send("Here in the backend")
})

app.post('/login',(req,res)=>{
    login(req,res)
})

app.post('/signup',(req,res)=>{
    Signup(req,res)
})

app.post('/AddAuction',(req,res)=>{
    AddAuction(req,res)
})


app.post('/LiveAuction',(req,res)=>{
    Live_Auction(req,res)
})

app.post('/AuctionItem',(req,res)=>{
    AuctionItem(req,res)
})

app.post('/Profile',(req,res)=>{
    Profile(req,res)
})

app.post('/HistoryAuction',(req,res)=>{
    Auction_History(req,res)
})

app.post('/ItemSold',(req,res)=>{
    ItemSold(req,res)
})


//Checking Auction time Every Sec and Updating the if Auction is ended of not  ----- If in Production we can use Cronjob 

setInterval(()=>{



    
},1000)




server.listen(Port,()=>{
    console.log(`Server Started at Port : ${Port}`)
})


