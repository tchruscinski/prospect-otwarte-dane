const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: `info GET request \n 
                    trzeba będzie zajebać jakieś zajebiste w chuj obliczenia do 
                    tych danych zajebiście przygotowanych przez ministerstwo`
    });
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    res.status(200).json({
        message: "info GET request z jakims konkretnym idikiem",
        id: id
    });
});

module.exports = router;