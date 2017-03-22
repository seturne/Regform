const low = require('lowdb')
const db = low('db.json')

// db.defaults({users:[]}).write()

// db.get('users').push({name: 'bob', contact: '010-1111-2222', address: 'newyork', email: 'abc@abc.com', msg: 'hi'}).write()

const list = db.get('users').value()
console.log('list :: '+JSON.stringify(list))