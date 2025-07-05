// Utilities
const encrypt = require('./utils/encrypt')
const hashedPassword = async pwd => console.log(await encrypt.hash(pwd))

// 1. Generate Secret
// console.log(encrypt.secret())

// 2. Generate Hashed Password
// hashedPassword()
