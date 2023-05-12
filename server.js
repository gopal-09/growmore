const express=require('express')
const mongoose=require('mongoose');
const routes=require('./routes/user');
const app = express()
app.use(express.json())
app.use('/api',routes)
require("dotenv").config()
mongoose.connect(process.env.Mongodb_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
//
app.listen(5000,()=>{
    console.log('server listening')
})