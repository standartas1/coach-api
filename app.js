//Spinning express application, which will make handling requests easier

const express = require('express');
const app = express();
const morgan = require('morgan');           //Morgan will call the next function
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

mongoose.connect(
    'mongodb+srv://laurynas:' +
     process.env.MONGO_ATLAS_PW +
     '@node-rest-shop-7uvev.mongodb.net/test?retryWrites=true&w=majority', 
     {
        useNewUrlParser: true,
        useUnifiedTopology: true,
     }
);
mongoose.Promise = global.Promise;

const coachRoutes  = require('./api/routes/coaches');
const reviewRoutes = require('./api/routes/reviews');
const userRoutes   = require('./api/routes/users');

//Middleware
app.use(morgan('dev'));
app.use('/coachImages', express.static('coachImages'));
app.use(bodyParser.urlencoded({extended: false}));  //only support simple bodies for url encoded data
app.use(bodyParser.json());                         //extract json data and makes it more easy to read

//Give access, when we connect an application, avoid CORS errors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//Routes, which should handle requests
app.use('/coaches',  coachRoutes);      //everything, that starts with /coaches. will be forwarded to coaches.js file
app.use('/reviews',  reviewRoutes);     //everything, that starts with /reviews. will be forwarded to reviews.js file
app.use("/users",     userRoutes);


//404 error handling
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);                        //forward the error request
});

//All other errors handling
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;