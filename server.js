const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var cors = require('cors');
const data_controllers = require('./data_controllers');

const PORT = process.env.PORT || 8080;

app = express();
app.use(cors());

const dbRoute = 'mongodb+srv://dbUser:ku5suqAB5GJAMl2g@cluster0.n1pim.mongodb.net/react-saa?retryWrites=true&w=majority';

app.use(express.static('client/'));


mongoose
.connect(dbRoute, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(()=> {
    console.log('Mongoose connected');
    console.log('Start Express server');
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname + '/client/index.html'));
    });
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

app.get('/', (req, res) => {
    res.send({ message: "We did it!" });
  });


app.post('/putData', data_controllers.add_weather);
app.get('/getData', data_controllers.get_weather);

app.post('/removeData/', data_controllers.remove_weather);








