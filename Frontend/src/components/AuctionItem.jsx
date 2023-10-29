import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "../css/Auction_item.css"
import axios from 'axios'
import { socket} from '../socket'

function AuctionItem() {


    const params = useParams()
    const navigate = useNavigate()

    const AuctionID = params.AuctionId

    //Variable from Auction Data
    const [AuctionStatus,SetAuctionStatus] = useState('')
    const [Name,SetName] = useState('')
    const [Description,SetDescription] = useState('')
    const [StartBid,SetStartBid] = useState('')
    const [HighestBid,SetHighestBid] = useState('')
    const [Room,SetRoom] = useState('')
    const [YourBid,SetYourBid] = useState('')
    const [Email,SetEmail] = useState('')
    const [Messages,SetMessages] = useState([])

    const [InputMessage,SetInputMessage] = useState('')


    useEffect(()=>{

    // Send Request to Server to fetch Data
        axios.post("http://localhost:8000/AuctionItem",{
            Cookie:document.cookie,
            AuctionID:AuctionID
        }).then((result)=>{
            // console.log(result.data)
            if (result.data.Status == false && result.data.Online == false){
                return navigate('/')
            }

            else if(result.data.Status == false ){
                return (

                    console.log(result.data.message)
                    )
            }
            else{
                
                const Itemdata = result.data.data
                // console.log(Itemdata)
                SetAuctionStatus(result.data.Online)
                SetName(Itemdata.Name)
                SetEmail(Itemdata.Email)
                SetDescription(Itemdata.Description)
                SetStartBid(Itemdata.StartBid)
                SetHighestBid(Itemdata.CurrentBid)   
                SetMessages(Itemdata.Message) 
            }          
        })

        if (!Room){
            socket.emit('JoinRoom', AuctionID)
            SetRoom(AuctionID)
        }
        else{

        }

        
        socket.on('ReceiveMessage',(chat)=>{
            console.log("Hele")
            console.log("Receive Message: " + chat)
            SetMessages([...Messages,{user:chat.Email,message:chat.Message}])

        })
    

        socket.on('ReceiveBid',(data)=>{
            SetHighestBid(data.Bid)
        })
        
        socket.emit('LeaveRoom',Room)

    },[])


  

    //Adding New Bid 

    const AddBid = (e)=>{

        e.preventDefault()

        if (YourBid <= HighestBid){
            return (
                console.log("Lower Bid")
                )
        }
        else{

            socket.emit('SendBid',{Room:AuctionID,Bid:YourBid,Cookie:document.cookie})
            SetHighestBid(YourBid)
        }
    }


    //Sending Message Function

    const SendMessage = (e)=>{
        e.preventDefault()

        socket.emit('SendMessage',{Room:AuctionID,Message:InputMessage,Email:Email})
        SetMessages([...Messages,{user:Email,message:InputMessage}])
        
    }

  return (
    <>
        <div className='AuctionItem_Container'>
            <div className='AuctionItem_card card'>

            <div className='Item_Question'>
                    <span className='question'>Status:</span> <span>{AuctionStatus? <>Live</>:<>Sold</> }</span> 
                </div>

                <div  className='Item_Question' >
                    <span  className='question'>Name:</span>
                     <span>{Name}</span>
                </div>

                <div className='Item_Question'>
                    <span className='question' >Description:</span> <span>{Description}</span>
                </div>
                <div className='Item_Question'>
                    <span className='question' >Starting Bid:</span> <span>${StartBid} </span>
                </div>
                <div className='Item_Question'>
                    <span className='question'>Highest Bid:</span> <span>${HighestBid}</span> 
                </div>
                <div className='Item_Question'>
                    <span className='question'>Your Bid:</span> 
                        <span>
                            <input  type='number' onChange={e=>SetYourBid(e.target.value)}/>
                            <button onClick={e=>AddBid(e)}>Bid</button></span> 
                </div>

                <div className='Chat_room'>
                    <div>Chats: </div>
                    <div>
                    <div className='card'>

                        <div className='chat_section'>

                            {Messages.map((chat)=>{
                                return (
                                    <div className='Message card' key={chat.message}>
                                    <div>{chat.user}:</div>
                                    <div>{chat.message}</div>
                                </div>
                                )
                            })}

                         

                        </div>

                        <div className='input_chat_div'>
                            <input  placeholder='Enter Your Message' onChange={(e)=>SetInputMessage(e.target.value)}/>
                            <button onClick={e=>SendMessage(e)}>Send</button>
                        </div>
                    </div>
                
                    </div>

                </div>

               

            </div>
            
        </div>
    </>
  )
}

export default AuctionItem