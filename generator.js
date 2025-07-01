// Utilities
const encrypt = require('./utils/encrypt')

// 1. Generate Secret
// console.log(encrypt.secret())

// 2. Generate Hashed Password (Testing Purpose)
const hashedPassword = async pwd => console.log(await encrypt.hash(pwd))
hashedPassword(null)
