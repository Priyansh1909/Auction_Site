import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './css/index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from 'react-auth-kit';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider authType = {'cookie'}
    authName={'_auth'}
    cookieDomain={window.location.hostname}
    cookieSecure={false}
    >
  {/* <React.StrictMode> */}
       <App />
  {/* </React.StrictMode> */}
    </AuthProvider>
)
