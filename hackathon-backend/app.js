const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dataRoutes = require('./api/routes/data');
const infoRoutes = require('./api/routes/info');
///
const wykonaj = require('./index');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST');
        return res.status(200).json({});
    }
    next();

});

app.use('/data', dataRoutes);
app.use('/info', infoRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
// wykonaj();
module.exports = app;