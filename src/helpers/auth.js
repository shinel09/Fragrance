import bcrypt from 'bcrypt'
 
 
 // ash the password
 export const hashpassword = (password)=>{
    return new Promise((resolve, reject) => {
        // generate saltRound
        bcrypt.genSalt(12, (err, salt)=>{
            if (err) {
                reject(err)
            }

            // generate the hashPassword
            bcrypt.hash(password, salt, (err, hash)=>{
                if (err) {
                    reject(err)
                }
                resolve(hash)
            })
        })
    })
}

// compare password
export const comparePassword = (password, hashed) =>{
    return bcrypt.compare(password, hashed)
}

// export default { hashpassword, comparePassword}