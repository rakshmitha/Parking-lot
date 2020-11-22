# PARKING LOT SYSTEM API
# Node/Express/Mongoose API
![N|Solid](https://shawndsilva.com/public/assets/images/jXAvz9h.png)
[![Build Status](https://travis-ci.org/anishkny/node-express-realworld-example-app.svg?branch=master)](https://travis-ci.org/anishkny/node-express-realworld-example-app)

> ### Node (Express + Mongoose) codebase containing real world parking lot functionalities (CRUD, auth, advanced patterns, etc) that adheres to the API spec.

This repo is functionality complete — PRs and issues welcome!

#Objectives
1. Park a car : The Endpoint is given as the car number as input and outputs the slot where it is parked. If the parking lot is full, the appropriate error message is returned

2. Unpark a car : This endpoint takes the slot number fro, which the car is to be removed from and frees that slot up to be used by other cars

3. Get the car/slot info : This endpoint can take either the slot number or car number and return both car number and slot number for the input

4. Server rate limit - If a user makes more than 10 requests in 10 seconds, we return the appropriate error message.

# Getting started

To get the Node server running locally:

- Clone this repo
- `npm i` to install all required dependencies
- Create a .env file with the following:
    ```sh
    SLOTS = 
    PORT = 
    DBURI =
    ```
    where SLOTS = no. of slots 
          PORT = server port number
          DBURI = your mongodb uri describing the db connenction and location
- Install MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials)) and run it by executing `mongod`
- `node index` to start the local server
- Click on the IP addresss shown in your terminal and after the end of the url do the following:

  To park a car
    ```sh
   api/park?car_no=<desired car no in integer>
    ```
    example : http://localhost:3000/api/park?car_no=1999
    
   To unpark a car
    ```sh
    api/unpark?car_no=<desired car no in integer>
    ```
    example : http://localhost:3000/api/unpark?car_no=1999
    
    To know in which slot the car is parked
   ```sh
    api/info?car_no=<desired car no in integer>
    ```
    example : http://localhost:3000/api/info?car_no=1999
    
    To know which car is parked in particular slot 
   ```sh
    api/info?slot_no=<desired slot no in integer>
    ```
    example : http://localhost:3000/api/info?slot_no=1


# Code Overview

## Dependencies
  
- express 4.17.1 - The server for handling and routing HTTP requests & Middleware for validating JWTs for authentication
- dotenv 8.2.0 - The parking lot size is given using an environment variable in the .env file which is created during the code base and can be changed when starting the server.
- mongoose 5.10.15 - For modeling and mapping MongoDB data to javascript & For handling unique validation errors in Mongoose. Mongoose only handles validation at the document level, so a unique index across a collection will throw an exception at the driver level. The `mongoose-unique-validator` plugin helps us by formatting the error like a normal mongoose `ValidationError`.
- express-rate-limit 5.2.3 - to limit api request with a specified time


## Application Structure

- `index.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `routes/` - This folder contains the route definitions for our API.
- `models/` - This folder contains the schema definitions for our Mongoose models.





