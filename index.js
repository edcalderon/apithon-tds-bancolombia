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
	web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/162c6026989446e08fb54b3fe3888f12"));
	console.log('Using INFURA**************************');
  }
//ABI:
abi_path = require('./abi.json')
const abi = web3.eth.contract(abi_path)
const contractAddress = '0xC6f64C8eB20d01a2A16feC69A29170B9eED65905'
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
.get('/getdata/:pk',cors(), (req, res) => {
    let pk = req.params.pk
    contract.longitud_medidas((err,resp) => {
        //console.log("Longitud del vector: " + resp.c[0])
        for (i = 0 ; i < resp.c[0]; i++) {              
          contract.medidas(i,(err,dataout) => {
            if(String(dataout[4].toUpperCase()) == String(pk).toUpperCase()){
              data.push(dataout) 
            }else{
              dataout = "pk no encontrada"
              data.push(dataout) 
            }
          });  
        }
    }) 
    res.json({data: data})
    data = []
})
.get('/getlast/:pk',cors(), (req, res) => {
  let pk = req.params.pk
  contract.longitud_medidas((err,resp) => {       
        contract.medidas(resp.c[0]-1,(err,dataout) => {
          if(String(dataout[4].toUpperCase()) == String(pk).toUpperCase()){
            data.push(dataout) 
          }else{
            dataout = "pk no encontrada"
            data.push(dataout) 
          }
        });  
  }) 
  res.json({data: data})
  data = []
})
.listen(PORT, () => console.log(`Listening on ${ PORT }`))


