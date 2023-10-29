import React, { useEffect, useState } from 'react'
import "../css/home.css"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Live_Auction from './Subpages/Live_Auction';
import Auction_History from './Subpages/Auction_History';


function Home() {


  const [Alert,SetAlert] = useState('')
  const navigate = useNavigate();

 // Variable for Add Auction Button Show/ Hide
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Variable for Add Auction Item Data

  const [ItemName,SetIteamName] = useState('')
  const [ItemDesc, SetItemDesc] = useState('')
  const [ItemStartBid,SetItemStartBid] = useState(0)
  const [ItemTime,SetItemTime] = useState('')


  //Function For Sending Added Item to Backend With Token
  const AddItemForAuction = (e)=>{
      e.preventDefault()

      const timeNow = new Date().toISOString()

  // Verifying input value
      if (ItemName == '' || ItemDesc == ''){

          return SetAlert(
            <div className="alert alert-danger" id='alert_login' role="alert">
            Item Name and Description Cannot be Empty
            </div>
          )
        }
      else if (ItemStartBid < 1){
        return SetAlert(
          <div className="alert alert-danger" id='alert_login' role="alert">
          Starting Bid Invalid
          </div>
        )
        }
      else if (ItemTime == '' || ItemTime < timeNow ){
          return SetAlert(
            <div className="alert alert-danger" id='alert_login' role="alert">
            Auction Time Invalid
            </div>
              ) 
            }
      else{

      
      axios.post('http://localhost:8000/AddAuction',{
        ItemName:ItemName,
        ItemDesc:ItemDesc,
        ItemStartBid:ItemStartBid,
        ItemTime,ItemTime,
        Cookie:document.cookie
      }).then((result)=>{
        if (result.data.Status == false){
          return SetAlert(
            <div className="alert alert-danger" id='alert_login' role="alert">
            Auction Time Invalid
            </div>
              ) 
        }
        else{

          navigate(0)

          handleClose()


        }
      })


      }
  }





  
  return (
    <>
    <div className='Home_Container'>

      <div className='auction_add_div'>
      <Button variant="primary" onClick={handleShow}>
        Auction Your Item
      </Button>
      </div>


      {/* -------------Add Auction Item Html Code----------- */}

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Auction Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='Add_item_container'>
            <label className='item_label'>
              <span> Name:</span>  
              <input  placeholder='Enter Your Item Name' onChange={(e)=>SetIteamName(e.target.value)}/>
            </label>
            <label className='item_label'>
              <span> Description:</span>  
              <textarea rows={5}  placeholder='Enter Your Item Description' onChange={(e)=>SetItemDesc(e.target.value)} />
            </label> 
            <label className='item_label'>
              <span> Minimum Bid:</span>  
              $<input  placeholder='Enter Starting Bid' type='number' onChange={(e)=>SetItemStartBid(e.target.value)}/>
            </label>
            <label className='item_label'>
              <span> Auction Till:</span>  
              <input type="datetime-local" id="EndTime" onChange={(e)=>SetItemTime(e.target.value)}  min={Date.now()}/>

            </label>

            {Alert}
          </div>
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={AddItemForAuction}>
            Add Item
          </Button>
        </Modal.Footer>
      </Modal>



    {/* -----------Home HTML CODE----------- */}


      <Tabs
      defaultActiveKey="live_auction"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="live_auction" title="Live Auction">
        <Live_Auction/>
      </Tab>
      <Tab eventKey="auction_history" title="Auction History">
        <Auction_History/>
      </Tab>
   
    </Tabs>

      



    </div>
    </>
  )
}

export default Home