const express = require('express')
const app = express()
const port = 3000
const websiteBuilder = require("./websiteBuilder")

//this statically serves the public file, probbaly how to serve REACT build?
app.use(express.static("public"));

app.post('/submit', (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})