const commander = require('commander')
const rp = require('request-promise')
require('dotenv').config()

const serverURL = `http://${process.env.HOST}:${process.env.PORT}`

commander
  .version('1.0.0', '-v, --version', 'Outputs the current version.')
  .description('CLI tool for interacting with the key value RESTful API.')

commander
  .command('get <key>')
  .alias('g')
  .description('Gets the value associated with the provided key.')
  .action(key => {
    const options = {
      method: 'GET',
      url: `${serverURL}/get/${key}`,
      json: true,
      resolveWithFullResponse: true
    }
    rp(options).then(response => {
      const respValue = response.body.value
      if (respValue) {
        if (typeof respValue === 'object') {
          console.log(`The associated value is: ${JSON.stringify(response.body.value)}`)
        } else {
          console.log(`The associated value is: ${respValue.toString()}`)
        }
      } else {
        console.log('An associated value wasn\'t found!')
      }
    }).catch(err => {
      console.error(err)
    })
  })

commander
  .command('set <key> <value>')
  .alias('s')
  .description('Sets the specified value to the provided key.')
  .action((key, value) => {
    const options = {
      method: 'GET',
      url: `${serverURL}/set/${key}/${value}`,
      json: true,
      resolveWithFullResponse: true
    }
    rp(options).then(response => {
      console.log(`${response.body.message}`)
    }).catch(err => {
      console.error(err)
    })
  })

commander
  .command('delete <key>')
  .alias('d')
  .description('Deletes the specified key-value pair.')
  .action(key => {
    const options = {
      method: 'GET',
      url: `${serverURL}/delete/${key}`,
      json: true,
      resolveWithFullResponse: true
    }
    rp(options).then(response => {
      console.log(`${response.body.message}`)
    }).catch(err => {
      console.error(err)
    })
  })

commander.parse(process.argv)
