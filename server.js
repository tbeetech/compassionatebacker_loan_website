require('dotenv').config()


const PORT = 8080;
const log = console.log;
const express = require("express");
const sendMail = require('./mail')
const bodyParser = require("body-parser");
const app = express();
var path = require("path")
var favicon = require('serve-favicon');
app.use(express.static(__dirname + "/public"));


// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())

// app.enable('trust proxy')
// app.use((req, res, next) => {
//     req.secure ? next() : res.redirect('https://' + req.headers.host + req.url)
// })

app.post("/contact", (req, res) => {

  const {subject, email, text} = req.body
  console.log('Data: ', req.body);

  sendMail(email, subject, text, function(err,data){
    if(err) {
      res.status(500).json({ message: 'Internal Error'});
    } else {
      res.json({message: "Email has been sent!!"})
    }
  })
  
});


app.use(favicon(path.join(__dirname, 'public','images', 'favicon.ico')))


app.get("/", (req, res) => {
  res.render("index");
});

app.get("/sitemap", (req, res) => {
  res.sendFile('/sitemap.xml')
})
app.get("/assetinfo", (req, res) => {
 res.render("assetinfo")

})

app.get("/about-our-company", (req, res) => {
  res.render("about-our-company")
});

app.get("/loaninfo", (req, res)=>{
  res.render("loaninfo")
})
app.get("/business-services", (req, res)=>{
  res.render("business-services")
});


app.get("/contact", (req, res)=> {
  res.render("contact")
});

app.get("/gallery", (req, res)=> {
  res.render("gallery")
})

app.get("/investors", (req, res)=> {
  res.render("investors")
})
app.get("/customer_feedbacks", (req, res)=> {
  res.render("customer_feedbacks")
})

//MAILING SYSTEM.....

app.set("view engine", "ejs");


const server = app.listen(process.env.PORT || PORT, ()=> {
  console.log('runs @ port{8080}');
})

server.keepAliveTimeout = 60


// console.log("compassionate server is now running");