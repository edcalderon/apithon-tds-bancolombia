#  simple-rest-server
This is a rest API built on top of [expressjs](https://expressjs.com/) to get the energy trackers data for unergy project. 
[app](https://unergy-tracker-api.herokuapp.com/
# Runing the server
You will need nodejs and npm to be installed on your system.

## Install dependencies

    $ npm install

## Execute the server

    $ node index.js
   After this the server will be listening in the next url: 
   [http://localhost:5000](http://localhost:5000)

# URLS
The server provides an empty HTML file in the root of the site and a "getdata" resource where you can  **Retrieve** the data of the trackers

## Root (GET /)
[http://localhost:5000](http://localhost:5000)
For the root route, the server renders the index.html found in public directory.

## Get all data of tracker (GET /getdata)
[http://localhost:5000/getdata](http://localhost:5000/parking)
This endpoint returns all the transaction in the contract

## Get data from id (GET /getdata/:pk)
[http://localhost:5000/getdata/1](http://localhost:5000/parking/1)
This endpoint returns the data of one transaction by its public key

## Get data from id (GET /getlast/:pk)
[http://localhost:5000/getdata/1](http://localhost:5000/parking/1)
This endpoint returns the last entry by public key.

# Postman
Inside the postman folder, you will find a postman collection that you could use as an example to test the server.



