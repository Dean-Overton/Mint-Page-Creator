// const websiteBuilder = require("./websiteBuilder")

//this statically serves the public file, probbaly how to serve REACT build?
// app.use(express.static("public"));

const express = require("express")
const path = require("path")
const multer = require("multer")
const app = express()
    
// View Engine Setup
// app.set("views",path.join(__dirname,"views"))
// app.set("view engine","ejs")

// Parse JSON bodies for this app. Make sure you put
// `app.use(express.json())` **before** your route handlers!
app.use(express.json());

//then can just get req.body as json object in post requests
    
var mime    =   require('mime');
var fs = require('fs');
// var bodyParser =	require("body-parser");
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

var storage	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, `./uploads`);
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});

// + '-' + Date.now() + '.' + mime.extension(file.mimetype)

var upload = multer({ storage : storage }).array('img');

app.get('/completeForm', function(req, res){
	res.sendFile(__dirname + '/' + 'completeForm.html')
});

app.post("/postFormAct", function (req, res, next) {
    upload(req,res,function(err) {
        console.log(req.files);
        // console.log(req.body.user); 
	    console.log(req.body);
        
        const dir = `./submitted/${req.body.wallet}`;
        
        //checks if directory already exists or not
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }
        else{
            res.send("That wallet has already created a website!");
        }

        for(let i=0; i < req.files.length; i++){
            var fileName = req.files[i].filename;

            //currently assumes all files are correctly named
            fs.rename('./uploads/' + fileName, 
            dir + '/' + fileName, 
            function (err) {
                if (err) {
                    return console.error(err);
                }
    
                // res.json({});
            });
        }

        //create json data file
        let data = JSON.stringify(req.body);
        fs.writeFileSync(`${dir}/data.json`, data);

        //start processing order
        //inputs are all set up to call next functions
    });

    //redirects you back to same web form
    res.sendFile(__dirname + '/' + 'completeForm.html'); 
});
    
// Take any port number of your choice which
// is not taken by any other process
app.listen(8080,function(error) {
    if(error) throw error
        console.log("Server created Successfully on PORT 8080")
})