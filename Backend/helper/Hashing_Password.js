const bcrypt = require('bcrypt')


module.exports = async function(Password){

    const Salt = 10

    return new Promise((resolve, reject) => {
        bcrypt.hash(Password,Salt,(err,hash)=>{
            if(err){
                reject(err)
            }

            resolve(hash)
        })
    })
}