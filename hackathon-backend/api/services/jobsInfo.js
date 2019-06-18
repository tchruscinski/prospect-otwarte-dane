class JobsInfoParams {
    constructor(amountOfJobsOffers) {
        this.amountOfJobsOffers = amountOfJobsOffers;

        
        this.createSelectQuery();
    }

    createSelectQuery(){
        let sql = `SELECT grupa, bezrobotni_koniec_roku FROM zawody_deficytowe WHERE oferty_internet >= ${this.amountOfJobsOffers} LIMIT 10`;
        return sql;
    }
    
}

module.exports = JobsInfoParams;