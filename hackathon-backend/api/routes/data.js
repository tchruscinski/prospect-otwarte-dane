const express = require('express');
const jobsOffersInfo = require('../services/jobsInfo');
const router = express.Router();
const connection = require('../db/dbconnect');



router.get('/', (req, res, next) => {
    const jobsInfo = new jobsOffersInfo(100);
    connection.query(jobsInfo.createSelectQuery(), function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.status(200).json({
            data: results
        });
      });
    
});

module.exports = router;