

const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var cors = require('cors');
const data_controllers = require('./data_controllers');

const PORT = process.env.PORT || 8080;

app = express();
app.use(cors());
require('dotenv').config();

mongoose
.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(()=> {
    console.log('Mongoose connected');
    console.log('Start Express server');
    app.listen(PORT);
    
})
.catch(err =>{
    console.log(err);
});

const db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



mongoose.set('useFindAndModify', false);

//tiedostojen haku käännetyssä versiossa

app.use(express.static(path.join(__dirname,'client','build')))



/* app.get("/",(req,res) => {
    res.sendFile(path.join(__dirname,'client','build','index.html'))
}) */
app.post('/putData', data_controllers.add_weather); //datan lisäys kantaan
app.get('/getData',data_controllers.get_weather); //datan haku

app.post('/removeData',data_controllers.remove_weather); //yksittäisen tietueen poisto














