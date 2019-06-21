class cityData {
    constructor(name) {
        this.name = name;
    }

    createSelectQuery(){
        let sql = `SELECT AVG(nieruchomosci.cena), SUM(bezrobotni.ilosc), wynagrodzenie.wynagrodzenie_brutto, wynagrodzenie.wynagrodzenie_w_relacji, populacja.liczba_ludnosci FROM bezrobotni INNER JOIN nieruchomosci ON bezrobotni.miasto = nieruchomosci.miasto INNER JOIN wynagrodzenie ON wynagrodzenie.miasto = bezrobotni.miasto INNER JOIN populacja ON populacja.miasto = bezrobotni.miasto WHERE bezrobotni.miasto = '${this.name}' GROUP BY populacja.liczba_ludnosci`;
        return sql;
    }
    
}

module.exports = cityData;