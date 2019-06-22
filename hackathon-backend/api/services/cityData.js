class cityData {
    constructor(name) {
        this.name = name;
        this.dataArray = [];
    }

    createSelectQueryAllCities() {
        let sql = `SELECT nieruchomosci.miasto, AVG(wynagrodzenie.wynagrodzenie_brutto) AS sredniaKrajowa, AVG(nieruchomosci.cena) AS cenam2, SUM(bezrobotni.ilosc) AS bezrobotni, wynagrodzenie.wynagrodzenie_brutto, wynagrodzenie.wynagrodzenie_w_relacji, populacja.liczba_ludnosci, populacja.procent_bezrobocia, populacja.ilosc_ofert_pracy, populacja.zatrudnieni_rolnictwo, populacja.zatrudnieni_uslugi, populacja.zatrudnieni_przemysl, populacja.liczba_ludnosci_stara, populacja.srednia_pensja_stara, populacja.srednia_pensja, dane.szkoly_podstawowe, dane.szkoly_srednie, dane.ludzie_na_apteke, dane.lekarze_na_10tys FROM bezrobotni INNER JOIN nieruchomosci ON bezrobotni.miasto = nieruchomosci.miasto INNER JOIN wynagrodzenie ON wynagrodzenie.miasto = bezrobotni.miasto INNER JOIN populacja ON populacja.miasto = bezrobotni.miasto INNER JOIN dane ON dane.miasto = bezrobotni.miasto GROUP BY populacja.liczba_ludnosci, wynagrodzenie.wynagrodzenie_brutto, wynagrodzenie.wynagrodzenie_w_relacji, nieruchomosci.miasto, populacja.procent_bezrobocia, populacja.ilosc_ofert_pracy, populacja.zatrudnieni_rolnictwo, populacja.zatrudnieni_uslugi, populacja.zatrudnieni_przemysl, populacja.liczba_ludnosci_stara, populacja.srednia_pensja_stara, populacja.srednia_pensja, dane.szkoly_podstawowe, dane.szkoly_srednie, dane.ludzie_na_apteke, dane.lekarze_na_10tys`;
        return sql;
    }

    createSelectQuery() {
        let sql = `SELECT AVG(nieruchomosci.cena) AS cenam2, AVG(wynagrodzenie.wynagrodzenie_brutto) AS sredniaKrajowa, SUM(bezrobotni.ilosc) AS bezrobotni, wynagrodzenie.wynagrodzenie_brutto, wynagrodzenie.wynagrodzenie_w_relacji, populacja.liczba_ludnosci, populacja.procent_bezrobocia, populacja.ilosc_ofert_pracy, populacja.zatrudnieni_rolnictwo, populacja.zatrudnieni_uslugi, populacja.zatrudnieni_przemysl, populacja.liczba_ludnosci_stara, populacja.srednia_pensja_stara, populacja.srednia_pensja, dane.szkoly_podstawowe, dane.szkoly_srednie, dane.ludzie_na_apteke, dane.lekarze_na_10tys FROM bezrobotni INNER JOIN nieruchomosci ON bezrobotni.miasto = nieruchomosci.miasto INNER JOIN wynagrodzenie ON wynagrodzenie.miasto = bezrobotni.miasto INNER JOIN populacja ON populacja.miasto = bezrobotni.miasto INNER JOIN dane ON dane.miasto = bezrobotni.miasto WHERE bezrobotni.miasto = '${this.name}' GROUP BY populacja.liczba_ludnosci, populacja.procent_bezrobocia, populacja.ilosc_ofert_pracy, populacja.zatrudnieni_rolnictwo, populacja.zatrudnieni_uslugi, populacja.zatrudnieni_przemysl, populacja.liczba_ludnosci_stara, populacja.srednia_pensja_stara, populacja.srednia_pensja, dane.szkoly_podstawowe, dane.szkoly_srednie, dane.ludzie_na_apteke, dane.lekarze_na_10tys`;
        return sql;
    }

    createResponseAllCities(results) {
        for (let index = 0; index < results.length; index++) {
            let rolnictwo = results[index].zatrudnieni_rolnictwo / (results[index].zatrudnieni_rolnictwo + results[index].zatrudnieni_przemysl + results[index].zatrudnieni_uslugi) * 100;
            let uslugi = results[index].zatrudnieni_uslugi / (results[index].zatrudnieni_rolnictwo + results[index].zatrudnieni_przemysl + results[index].zatrudnieni_uslugi) * 100;
            let przemysl = results[index].zatrudnieni_przemysl / (results[index].zatrudnieni_rolnictwo + results[index].zatrudnieni_przemysl + results[index].zatrudnieni_uslugi) * 100;
            let wspMat = (results[index].liczba_ludnosci / results[index].liczba_ludnosci_stara) * (results[index].liczba_ludnosci / results[index].liczba_ludnosci_stara) * (results[index].srednia_pensja / results[index].srednia_pensja_stara) * (results[index].srednia_pensja / results[index].srednia_pensja_stara);
            let wspTom = results[index].wynagrodzenie_w_relacji *(results[index].wynagrodzenie_brutto / results[index].cenam2) * Math.cbrt((results[index].ilosc_ofert_pracy / results[index].liczba_ludnosci * 100)) * (1/results[index].procent_bezrobocia);

            let dataObject = {
                miasto: results[index].miasto,
                cenam2: results[index].cenam2,
                bezrobotni: results[index].bezrobotni,
                wynagrodzenie: results[index].wynagrodzenie_brutto,
                wynagrodznieRelacja: results[index].wynagrodzenie_w_relacji,
                pupulacja: results[index].liczba_ludnosci,
                stopaBezrobocia: results[index].procent_bezrobocia,
                ofertyPracyNaMieszkanca: results[index].ilosc_ofert_pracy / results[index].liczba_ludnosci,
                zatrudnieniRolnictwo: rolnictwo,
                zatrudnieniPrzemysl: przemysl,
                zatrudnieniUslugi: uslugi,
                wspMatiego: wspMat,
                wspTomka: wspTom,
                uczniowieNaJedenOddzialPodstawowka: results[index].szkoly_podstawowe,
                uczniowieNaJedenOddzialSrednia: results[index].szkoly_srednie,
                ludzieNaApteke: results[index].ludzie_na_apteke,
                lekarzeNa10Tys: results[index].lekarze_na_10tys

            }

            this.dataArray.push(dataObject);

        }
        return this.dataArray;
    }

    createResponse(results) {
        for (let index = 0; index < results.length; index++) {
            let rolnictwo = results[index].zatrudnieni_rolnictwo / (results[index].zatrudnieni_rolnictwo + results[index].zatrudnieni_przemysl + results[index].zatrudnieni_uslugi) * 100;
            let uslugi = results[index].zatrudnieni_uslugi / (results[index].zatrudnieni_rolnictwo + results[index].zatrudnieni_przemysl + results[index].zatrudnieni_uslugi) * 100;
            let przemysl = results[index].zatrudnieni_przemysl / (results[index].zatrudnieni_rolnictwo + results[index].zatrudnieni_przemysl + results[index].zatrudnieni_uslugi) * 100;
            let wspMat = (results[index].liczba_ludnosci / results[index].liczba_ludnosci_stara) * (results[index].liczba_ludnosci / results[index].liczba_ludnosci_stara) * (results[index].srednia_pensja / results[index].srednia_pensja_stara) * (results[index].srednia_pensja / results[index].srednia_pensja_stara);
            let wspTom = results[index].wynagrodzenie_w_relacji *(results[index].sredniaKrajowa / results[index].cenam2) * (results[index].ilosc_ofert_pracy / results[index].liczba_ludnosci * 100);

            let dataObject = {
                cenam2: results[index].cenam2,
                bezrobotni: results[index].bezrobotni,
                wynagrodzenie: results[index].wynagrodzenie_brutto,
                wynagrodznieRelacja: results[index].wynagrodzenie_w_relacji,
                pupulacja: results[index].liczba_ludnosci,
                stopaBezrobocia: results[index].procent_bezrobocia,
                ofertyPracyNaMieszkanca: results[index].ilosc_ofert_pracy / results[index].liczba_ludnosci,
                zatrudnieniRolnictwo: rolnictwo,
                zatrudnieniPrzemysl: przemysl,
                zatrudnieniUslugi: uslugi,
                wspMatiego: wspMat,
                wspTomka: wspTom,
                uczniowieNaJedenOddzialPodstawowka: results[index].szkoly_podstawowe,
                uczniowieNaJedenOddzialSrednia: results[index].szkoly_srednie,
                ludzieNaApteke: results[index].ludzie_na_apteke,
                lekarzeNa10Tys: results[index].lekarze_na_10tys
            }

            this.dataArray.push(dataObject);

        }
        return this.dataArray;
    }

}

module.exports = cityData;
