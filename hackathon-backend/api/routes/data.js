const express = require('express');
const jobsOffersInfo = require('../services/jobsInfo');
const Salary = require('../services/salaries');
const router = express.Router();
const connection = require('../db/dbconnect');



router.get('/', (req, res, next) => {
    const jobsInfo = new jobsOffersInfo(100);
    connection.query(jobsInfo.createSelectQuery(), function (error, results, fields) {
        if (error) throw error;
        res.status(200).json({
            data: results
        });
    });
});

// router.get('/:amountOfJobOffers', (req, res, next) => {
//     const jobsInfo = new jobsOffersInfo(req.params.amountOfJobOffers);
//     connection.query(jobsInfo.createSelectQuery(), function (error, results, fields) {
//         if (error) throw error;
//         res.status(200).json({
//             message: "pobrales rekordy w których 'oferty_internet' >= " + req.params.amountOfJobOffers,
//             data: results,
//             yourValue: req.params.amountOfJobOffers
//         });
//     });
// });

router.get('/:city', (req, res, next) => {
    const salary = new Salary(req.params.city);
    connection.query(salary.createSelectQuery(), function (error, results, fields) {
        if (error) throw error;
        res.status(200).json({
            message: "Pobrales wynagrodzenia z " + req.params.city,
            data: results,
            yourValue: req.params.city
        });
    });
});

module.exports = router;
