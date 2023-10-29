const bcrypt = require('bcrypt')


module.exports = async function(Password,hashPassword){

    const Salt = 10

    return new Promise((resolve, reject) => {
        bcrypt.compare(Password,hashPassword,(err,result)=>{
            if(err){
                reject(err)
            }

            resolve(result)
        })
    })
}