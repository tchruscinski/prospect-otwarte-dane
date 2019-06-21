class Salaries {
    constructor(city) {
        this.city = city;
        this.createSelectQuery();
    }

    createSelectQuery(){
        let sql = `SELECT wynagrodzenie_brutto, wynagrodzenie_w_relacji FROM wynagrodzenie WHERE miasto = \'${this.city}\'`;
        return sql;
    }

}

module.exports = Salaries;
