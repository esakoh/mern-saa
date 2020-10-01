
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var cors = require('cors');
const data_controllers = require('./data_controllers');

const PORT = process.env.PORT || 8080;

app = express();
app.use(cors());
const router = express.Router();

const dbRoute = 'mongodb+srv://dbUser:ku5suqAB5GJAMl2g@cluster0.n1pim.mongodb.net/react-saa?retryWrites=true&w=majority';


mongoose
.connect(dbRoute, {
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

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if(req.method ==='OPTION'){
        res.header("Access-Control-Allow-Methods", 'GET,POST,PUT,DELETE,PATCH');
        return res.status(200).json({});
    }
    next();
});

mongoose.set('useFindAndModify', false);

app.use(express.static(path.join(__dirname,'client','build')))

/*app.get('*', (req, res) => {
    res.sendFile('/client/build/index.html', {root: __dirname});
  });*/

//app.use(express.static('client'));

app.get("/",(req,res) => {
    res.sendFile(path.join(__dirname,'client','build','index.html'))
})
app.post('/putData', data_controllers.add_weather);
app.get('/getData',data_controllers.get_weather);

app.post('/removeData/',data_controllers.remove_weather);
app.options('*', cors());

app.use('/api', router);











