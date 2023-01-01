const express = require('express')
const app = express()
const cors = require('cors');
const mongoose = require('mongoose');
const user = require('./models/model.user');
const exercise = require('./models/model.exercise');
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(result=>app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port 3000')
  }))

  .catch(err => console.log("An error occured."))


app.post('/api/users',async(req,res)=>{
  const username = req.body.username;

  const users = await user.create({username});

  res.send(users);

})

app.get('/api/users',async(req,res)=>{
  const users = await user.find();
  res.send(users);
})

app.post('/api/users/:_id/exercises',async(req,res)=>{
  let {description,duration,date} = req.body;

  // const userId = req.body[':_id'];

  const userId = req.params._id;

  const foundUser = await user.findById(userId);

  if(!foundUser){
    res.json({message:"No such user found"})
  }

  if(!date){
    date = new Date().toDateString();
  }

  if(date){
    date = new Date(date).toDateString();
  }

  exercise.create({
    username: foundUser.username,
    description,
    duration,
    date,
    _id: userId
  })

  res.send({
    username: foundUser.username,
    description,
    duration,
    date,
    _id:userId
    
  })
})

app.get('/api/users/:_id/logs',async(req,res)=>{
  const userId = req.params._id;

  const foundUser = await user.findById(userId);

  const exercises = await exercise.find({userId});

  const Exercise = exercises.map(exercise=>{
    return {
      description : exercise.description,
      duration : exercise.duration,
      date : exercise.date.toDateString()
    }
  })

  res.json({
    _id:userId,
    username : foundUser.username,
    count : exercise.length,
    log : Exercise

  })




})


// const listener = 
