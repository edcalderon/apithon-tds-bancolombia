const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000;
const Web3 = require('web3') 
const cors = require('cors')

//Prueba Actualizar Archivo HOSTINGER
if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
	web3 = new Web3(web3.currentProvider);
	console.log('Using MetaMask**************************');
  } else {
    console.log('No web3? You should consider trying MetaMask!')
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
	web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/142f507682594dba987b1d47b2b175e4"));
	console.log('Using INFURA**************************');
  }
//ABI:
const abi = web3.eth.contract([{"constant":true,"inputs":[],"name":"longitud_medidas","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_hash_medidor","type":"string"},{"name":"_energia","type":"uint256"},{"name":"_tiempo","type":"string"}],"name":"nueva_medida","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"pk2medidas","outputs":[{"name":"ID","type":"uint256"},{"name":"hash_medidor","type":"string"},{"name":"energia","type":"uint256"},{"name":"tiempo","type":"string"},{"name":"pk_medidor","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"pk2cuenta_medidas","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"medidas","outputs":[{"name":"ID","type":"uint256"},{"name":"hash_medidor","type":"string"},{"name":"energia","type":"uint256"},{"name":"tiempo","type":"string"},{"name":"pk_medidor","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}])
const contractAddress = '0xe7357d40168d23b15e7c5516b5304680aac5a358'
const contract = abi.at(contractAddress)

var data = []

express()
.use(cors())
.use(bodyParser.json())
.use(express.static(path.join(__dirname, 'public')))
.get('/',  (req, res) => {
    res.render('index', {});
})
.get('/getdata', cors(), (req, res) => {
    contract.longitud_medidas((err,resp) => {
        //console.log("Longitud del vector: " + resp.c[0])
        for (i = 0 ; i < resp.c[0]; i++) {              
          contract.medidas(i,(err,dataout) => {
             data.push(dataout)     
          });  
        }
    })  
    res.json({data: data})
    data = []
})
.get('/getdata/:id',cors(), (req, res) => {
    let id = req.params.id
    contract.medidas(id,(err,dataout) => {
        res.json({data: dataout})   
     });  
})
.listen(PORT, () => console.log(`Listening on ${ PORT }`))


