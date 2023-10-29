import React, { useEffect, useState } from 'react'
import axios from 'axios'


function ItemSold() {

  const [AuctionItem,SetAuctionItem] = useState([])


    useEffect(()=>{

        axios.post('http://localhost:8000/ItemSold',{
            Cookie:document.cookie
        }).then((result)=>{
            console.log(result.data)
            SetAuctionItem(result.data.Auctionitem)
        })


    },[])
  return (
    <>
     <div className='Live_Auction_Container'>
      <div className='Auction_grid'>

          {AuctionItem.map((item)=>{
            return(
              <div className='Auction_card card' key={item._id}>
                <div>Name :  {item.Name}</div>
                <div>Description:  {item.Description}</div>
                <div>Final Bid: ${item.CurrentBid.Amount}</div>
            </div>

            )
          })}   
      </div>
    </div>

    </>
  )
}

export default ItemSold