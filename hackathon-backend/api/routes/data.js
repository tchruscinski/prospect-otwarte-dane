const express = require('express');
const jobsOffersInfo = require('../services/jobsInfo');
const Salary = require('../services/salaries');
const CityData = require('../services/cityData');
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

router.get('/salary/:city', (req, res, next) => {
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

router.get('/allData/:city', (req, res, next) => {
    const cityData = new CityData(req.params.city);
    connection.query(cityData.createSelectQuery(), function (error, results, fields) {
        if (error) throw error;
        res.status(200).json({
            message: "Pobrales wszytskie dane o " + req.params.city,
            data: results,
            yourValue: req.params.city
        });
    });
});

router.get('/allCities', (req, res, next) => {
    const cityData = new CityData(null);
    connection.query(cityData.createSelectQueryAllCities(), function (error, results, fields) {
        if (error) throw error;
        res.status(200).json({
            message: "Pobrales dane o wszytskich miastach",
            data: results
        });
    });
});

module.exports = router;
