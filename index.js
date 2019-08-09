const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000;
const Web3 = require('web3') 
const cors = require('cors')

express()
.use(cors())
.use(bodyParser.json())
.use(express.static(path.join(__dirname, 'public')))
.get('/',  (req, res) => {
    res.render('index', {});
})
.get('/getdata', cors(), (req, res) => {

})
.listen(PORT, () => console.log(`Listening on ${ PORT }`))


