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
const abi = web3.eth.contract([{"constant":false,"inputs":[{"name":"_hash","type":"string"},{"name":"_energy","type":"string"},{"name":"_time","type":"string"}],"name":"newHash","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"hashes","outputs":[{"name":"hashID","type":"uint256"},{"name":"hash","type":"string"},{"name":"energy","type":"string"},{"name":"time","type":"string"},{"name":"owner","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"Hashlength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}])
const contractAddress = '0xc5b9443dd60d3997b47b7d7f411564a8489449dc'
const contract = abi.at(contractAddress)

var data = []

contract.Hashlength((err,res) => {
      console.log("Longitud del vector: " + res.c[0])
      for (i = 0 ; i < res.c[0]; i++) {              
        contract.hashes(i,(err,dataout) => {
           data.push(dataout)
        });  
    }
})


express()
.all('*', function(req, res, next) {
  var origin = req.get('origin'); 
  res.header('Access-Control-Allow-Origin', origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})
.use(bodyParser.json())
.use(express.static(path.join(__dirname, 'public')))
.get('/',  (req, res) => {
    res.render('index', {});
})
.get('/getdata', cors(), (req, res) => {
    contract.Hashlength((err,resp) => {
        //console.log("Longitud del vector: " + resp.c[0])
        for (i = 0 ; i < resp.c[0]; i++) {              
          contract.hashes(i,(err,dataout) => {
             data.push(dataout)     
          });  
        }
    })  
    res.json({data: data})
})
.get('/getdata/:id',cors(), (req, res) => {
    let id = req.params.id
    contract.hashes(id,(err,dataout) => {
        res.json({data: dataout})   
     });  
})
.listen(PORT, () => console.log(`Listening on ${ PORT }`))


