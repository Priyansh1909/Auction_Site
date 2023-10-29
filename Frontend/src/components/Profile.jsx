import React, { useEffect, useState } from 'react'
import "../css/profile.css"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import profile_pic from '../assets/account.png'
import axios from 'axios'
import ItemSold from './Subpages/ItemSold';

function Profile() {

  const [Name,SetName]= useState('')
  const [Email,SetEmail] = useState('')
  const [Wallet ,SetWallet] =  useState('')

  useEffect(()=>{

    axios.post('http://localhost:8000/Profile',{
      Cookie:document.cookie
    }).then((result)=>{
      console.log(result)
      if (result.data.Status == false){
        console.log("Server Error")
      }
      else{
        SetName(result.data.data.Name)
        SetEmail(result.data.data.Email)
        SetWallet(result.data.data.Wallet)


      }
    })
  },[])


  return (
    <>
        <div className='Profile_Container'>
            <div className='Profile_info'>
                <div>
                    <img src={profile_pic} width={100} className='profile_pic'></img>

                </div>
                <div>
                    <div>
                        Name : {Name}
                    </div>
                    <div>
                        Email: {Email}
                    </div>
                    <div>
                        Wallet: {Wallet}$
                    </div>
                </div>
            </div>

        </div>
        <Tabs
      defaultActiveKey="Item_Sold"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="Item_Sold" title="Item Sold">
        <ItemSold/>
      </Tab>
    </Tabs>
    </>
  )
}

export default Profile