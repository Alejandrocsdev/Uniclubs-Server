const { encrypt } = require('../utils')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('Enter password to hash: ', async pwd => {
  const hash = await encrypt.hash(pwd)
  console.log('\nHashed Password:')
  console.log(hash)
  rl.close()
})
