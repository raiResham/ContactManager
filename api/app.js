const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/route');
const cors = require("cors");
const port = 8081
var corsOptions = {
   origin: "*"
 };
 
 app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json())
app.use("/", routes)


var server = app.listen(port, function () {
   console.log(`Example app listening at http://localhost:${port}`)
})