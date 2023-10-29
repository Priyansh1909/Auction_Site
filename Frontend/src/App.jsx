import Home from './components/Home'
import Login from './components/Login'
import Register from './components/register'
import './css/App.css'
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom"
import { useIsAuthenticated } from 'react-auth-kit'
import Header from './components/Header'
import Profile from './components/Profile'
import AuctionItem from './components/AuctionItem'


function App() {


  // Checking the Cookie is Valid or Not
  const isAuthenticated = useIsAuthenticated();
  const auth = isAuthenticated();



  // if cookie is valid it will to its page else login page to login 
  const PrivateRoute = ({Page})=>{
    
    return auth ? <Page/> : <Navigate to='/login' />
  }

  // Same like PrivateRoute But its check if user is already login then it will not to login or sign up page and will be redirected to Home page
  
  const PublicRoute = ({Page})=>{


    return auth ?  <Navigate to='/' /> :<Page/> 
  }

  return (
    <>
    <Router>

    {/* if auth is valid then only it will show header so if the Route is Private then only */}
      {auth? <Header />:<></>}

      <Routes>

      <Route exact path='/login' element={<PublicRoute Page={Login} />}></Route>
      <Route exact path='/Signup' element={<PublicRoute Page={Register} />}></Route>
      <Route exact path='/' element={<PrivateRoute Page={Home} />}></Route>
      <Route path='/Profile' element={<PrivateRoute Page={Profile} />}></Route>
      <Route path='/AuctionItem/:AuctionId' element={<PrivateRoute Page={AuctionItem}/>}  ></Route>




      </Routes>

    </Router>
    </>
  )
}

export default App
