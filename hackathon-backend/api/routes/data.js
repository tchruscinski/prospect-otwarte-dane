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
        var dataArray = [];
        for (let index = 0; index < results.length; index++) {
            let dataObject = {
                cenam2: results[index].cenam2,
                bezrobotni: results[index].bezrobotni,
                wynagrodzenie: results[index].wynagrodzenie_brutto,
                wynagrodznieRelacja: results[index].wynagrodzenie_w_relacji,
                pupulacja: results[index].liczba_ludnosci,
                stopaBezrobocia: results[index].procent_bezrobocia,
                ofertyPracyNaMieszkanca: results[index].ilosc_ofert_pracy/results[index].liczba_ludnosci
            }

            dataArray.push(dataObject);
            
        }
        res.status(200).json({
            message: "Pobrales wszytskie dane o " + req.params.city,
            data: dataArray,
            yourValue: req.params.city
        });
    });
});

router.get('/allCities', (req, res, next) => {
    const cityData = new CityData(null);
    connection.query(cityData.createSelectQueryAllCities(), function (error, results, fields) {
        if (error) throw error;
        var dataArray = [];
        // console.log(results)
        for (let index = 0; index < results.length; index++) {
            let dataObject = {
                miasto: results[index].miasto,
                cenam2: results[index].cenam2,
                bezrobotni: results[index].bezrobotni,
                wynagrodzenie: results[index].wynagrodzenie_brutto,
                wynagrodznieRelacja: results[index].wynagrodzenie_w_relacji,
                pupulacja: results[index].liczba_ludnosci,
                stopaBezrobocia: results[index].procent_bezrobocia,
                ofertyPracyNaMieszkanca: results[index].ilosc_ofert_pracy/results[index].liczba_ludnosci
            }

            dataArray.push(dataObject);
            
        }
        // console.log(dataArray);
        res.status(200).json({
            message: "Pobrales dane o wszytskich miastach",
            data: dataArray
        });
    });
});

module.exports = router;
