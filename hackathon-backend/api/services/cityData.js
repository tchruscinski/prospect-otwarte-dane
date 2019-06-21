class cityData {
    constructor(name) {
        this.name = name;
    }

    createSelectQueryAllCities(){
        let sql = `SELECT nieruchomosci.miasto, AVG(nieruchomosci.cena), SUM(bezrobotni.ilosc), wynagrodzenie.wynagrodzenie_brutto, wynagrodzenie.wynagrodzenie_w_relacji, populacja.liczba_ludnosci, populacja.procent_bezrobocia FROM bezrobotni INNER JOIN nieruchomosci ON bezrobotni.miasto = nieruchomosci.miasto INNER JOIN wynagrodzenie ON wynagrodzenie.miasto = bezrobotni.miasto INNER JOIN populacja ON populacja.miasto = bezrobotni.miasto GROUP BY populacja.liczba_ludnosci, wynagrodzenie.wynagrodzenie_brutto, wynagrodzenie.wynagrodzenie_w_relacji, nieruchomosci.miasto, populacja.procent_bezrobocia`;
        return sql;
    }

    createSelectQuery(){
        let sql = `SELECT AVG(nieruchomosci.cena), SUM(bezrobotni.ilosc), wynagrodzenie.wynagrodzenie_brutto, wynagrodzenie.wynagrodzenie_w_relacji, populacja.liczba_ludnosci, populacja.procent_bezrobocia FROM bezrobotni INNER JOIN nieruchomosci ON bezrobotni.miasto = nieruchomosci.miasto INNER JOIN wynagrodzenie ON wynagrodzenie.miasto = bezrobotni.miasto INNER JOIN populacja ON populacja.miasto = bezrobotni.miasto WHERE bezrobotni.miasto = '${this.name}' GROUP BY populacja.liczba_ludnosci, populacja.procent_bezrobocia`;
        return sql;
    }
    
}

module.exports = cityData;