const express =require('express');
const app=express();
const port= process.env.Port ||  8000;
const cors = require('cors')
const connectDB=require('./config/mongoose');



app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended:false}));

app.use('/',require('./routes'));

app.listen(port,(error)=>{
  if(error){console.log("error in running the seerver");return ;}
  console.log("server is up and running on port",port);
})