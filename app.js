const express = require('express');
const mongoose = require('mongoose');


const config = require('./src/config/key');


//DB Config
const db = config.MongoURI;
//Connect to Mongo
mongoose.connect(db)
.then(()=>console.log("MongoDb Connected ..."))
.catch(err=>console.log(err));


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//api routes 
app.use('/api/housefinder/users', require('./src/routes/users'));
app.use('/api/housefinder/houses', require('./src/routes/houses'));
app.use('/api/housefinder/login', require('./src/routes/login'));


app.get('/', (req, res)=>{
    res.send([1,2,3]);
   
});

app.get('/api/users/:id', (req, res)=>{
    res.send(req.params.id);

})

app.listen(config.PORT,()=>console.log(`Listening on port ${config.PORT}...`));