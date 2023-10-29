const jwt = require('jsonwebtoken')
require('dotenv').config()



module.exports = async function(Cookie){


    return new Promise((resolve, reject) => {
        
 
    try {
        // Getting Token From the Cookie
        Cookie = Cookie.split(';')
        Cookie = Cookie[0].split('=')
        Token =Cookie[1]

        // Verifying the Recieved Token
        const decode = jwt.verify(Token,process.env.JWT_TOKEN)

        // console.log(decode)

        resolve({VerifyToken:true,userid:decode.userid,Email:decode.Email})
        
    } catch (error) {
        reject({VerifyToken:false})
        
    }
})



}