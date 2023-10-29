import React, { useEffect, useState } from 'react'
import "../../css/Live_Auction.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Live_Auction() {


  const [AuctionItem,SetAuctionItem] = useState([])

  const navigate = useNavigate()

  useEffect(()=>{

    axios.post('http://localhost:8000/LiveAuction',{
      Cookie:document.cookie
    }).then((result)=>{




      // console.log(result.data)
      SetAuctionItem(result.data.Auctionitem)
  
    })

  },[])

 
  const AuctionPage = (auctioid)=>{

    navigate(`/AuctionItem/${auctioid}`)


  }

  return (
    <>
    <div className='Live_Auction_Container'>
      <div className='Auction_grid'>

          {AuctionItem.map((item)=>{
            let date = new Date(item.EndTime).toLocaleString()
            return(
              <div className='Auction_card card' key={item._id} onClick={e=>AuctionPage(item._id)}>
                <div>Name :  {item.Name}</div>
                <div>Description:  {item.Description}</div>
                <div>Starting Bid: ${item.StartBid}</div>
                <div>Auction Till: {date} </div>
            </div>

            )
          })}   
      </div>
    </div>
    </>
  )
}

export default Live_Auction