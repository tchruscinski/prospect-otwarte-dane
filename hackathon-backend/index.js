
    const connection = require('./api/db/dbconnect');
    var data = `"RYNEK NIERUCHOMOŚCI";"RYNKOWA SPRZEDAŻ LOKALI MIESZKALNYCH";"Mediana cen za 1 m2 lokali mieszkalnych sprzedanych w ramach transakcji rynkowych (Wymiary: Transakcje rynkowe; Powierzchnia użytkowa lokali mieszkalnych)";"ogółem";"ogółem";"";"zł";6246;
    "RYNEK NIERUCHOMOŚCI";"RYNKOWA SPRZEDAŻ LOKALI MIESZKALNYCH";"Mediana cen za 1 m2 lokali mieszkalnych sprzedanych w ramach transakcji rynkowych (Wymiary: Transakcje rynkowe; Powierzchnia użytkowa lokali mieszkalnych)";"ogółem";"do 40 m2";"";"zł";6431;
    "RYNEK NIERUCHOMOŚCI";"RYNKOWA SPRZEDAŻ LOKALI MIESZKALNYCH";"Mediana cen za 1 m2 lokali mieszkalnych sprzedanych w ramach transakcji rynkowych (Wymiary: Transakcje rynkowe; Powierzchnia użytkowa lokali mieszkalnych)";"ogółem";"od 40,1 do 60 m2";"";"zł";6135;
    "RYNEK NIERUCHOMOŚCI";"RYNKOWA SPRZEDAŻ LOKALI MIESZKALNYCH";"Mediana cen za 1 m2 lokali mieszkalnych sprzedanych w ramach transakcji rynkowych (Wymiary: Transakcje rynkowe; Powierzchnia użytkowa lokali mieszkalnych)";"ogółem";"od 60,1 do 80 m2";"";"zł";6109;
    "RYNEK NIERUCHOMOŚCI";"RYNKOWA SPRZEDAŻ LOKALI MIESZKALNYCH";"Mediana cen za 1 m2 lokali mieszkalnych sprzedanych w ramach transakcji rynkowych (Wymiary: Transakcje rynkowe; Powierzchnia użytkowa lokali mieszkalnych)";"ogółem";"od 80,1 m2";"";"zł";6544;
    "RYNEK NIERUCHOMOŚCI";"RYNKOWA SPRZEDAŻ LOKALI MIESZKALNYCH";"Mediana cen za 1 m2 lokali mieszkalnych sprzedanych w ramach transakcji rynkowych (Wymiary: Transakcje rynkowe; Powierzchnia użytkowa lokali mieszkalnych)";"rynek pierwotny";"ogółem";"";"zł";6293;
    "RYNEK NIERUCHOMOŚCI";"RYNKOWA SPRZEDAŻ LOKALI MIESZKALNYCH";"Mediana cen za 1 m2 lokali mieszkalnych sprzedanych w ramach transakcji rynkowych (Wymiary: Transakcje rynkowe; Powierzchnia użytkowa lokali mieszkalnych)";"rynek pierwotny";"do 40 m2";"";"zł";6346;
    "RYNEK NIERUCHOMOŚCI";"RYNKOWA SPRZEDAŻ LOKALI MIESZKALNYCH";"Mediana cen za 1 m2 lokali mieszkalnych sprzedanych w ramach transakcji rynkowych (Wymiary: Transakcje rynkowe; Powierzchnia użytkowa lokali mieszkalnych)";"rynek pierwotny";"od 40,1 do 60 m2";"";"zł";6195;
    "RYNEK NIERUCHOMOŚCI";"RYNKOWA SPRZEDAŻ LOKALI MIESZKALNYCH";"Mediana cen za 1 m2 lokali mieszkalnych sprzedanych w ramach transakcji rynkowych (Wymiary: Transakcje rynkowe; Powierzchnia użytkowa lokali mieszkalnych)";"rynek pierwotny";"od 60,1 do 80 m2";"";"zł";6298;
    "RYNEK NIERUCHOMOŚCI";"RYNKOWA SPRZEDAŻ LOKALI MIESZKALNYCH";"Mediana cen za 1 m2 lokali mieszkalnych sprzedanych w ramach transakcji rynkowych (Wymiary: Transakcje rynkowe; Powierzchnia użytkowa lokali mieszkalnych)";"rynek pierwotny";"od 80,1 m2";"";"zł";6998;
    "RYNEK NIERUCHOMOŚCI";"RYNKOWA SPRZEDAŻ LOKALI MIESZKALNYCH";"Mediana cen za 1 m2 lokali mieszkalnych sprzedanych w ramach transakcji rynkowych (Wymiary: Transakcje rynkowe; Powierzchnia użytkowa lokali mieszkalnych)";"rynek wtórny";"ogółem";"";"zł";6159;
    "RYNEK NIERUCHOMOŚCI";"RYNKOWA SPRZEDAŻ LOKALI MIESZKALNYCH";"Mediana cen za 1 m2 lokali mieszkalnych sprzedanych w ramach transakcji rynkowych (Wymiary: Transakcje rynkowe; Powierzchnia użytkowa lokali mieszkalnych)";"rynek wtórny";"do 40 m2";"";"zł";6557;
    "RYNEK NIERUCHOMOŚCI";"RYNKOWA SPRZEDAŻ LOKALI MIESZKALNYCH";"Mediana cen za 1 m2 lokali mieszkalnych sprzedanych w ramach transakcji rynkowych (Wymiary: Transakcje rynkowe; Powierzchnia użytkowa lokali mieszkalnych)";"rynek wtórny";"od 40,1 do 60 m2";"";"zł";6005;
    "RYNEK NIERUCHOMOŚCI";"RYNKOWA SPRZEDAŻ LOKALI MIESZKALNYCH";"Mediana cen za 1 m2 lokali mieszkalnych sprzedanych w ramach transakcji rynkowych (Wymiary: Transakcje rynkowe; Powierzchnia użytkowa lokali mieszkalnych)";"rynek wtórny";"od 60,1 do 80 m2";"";"zł";5903;
    "RYNEK NIERUCHOMOŚCI";"RYNKOWA SPRZEDAŻ LOKALI MIESZKALNYCH";"Mediana cen za 1 m2 lokali mieszkalnych sprzedanych w ramach transakcji rynkowych (Wymiary: Transakcje rynkowe; Powierzchnia użytkowa lokali mieszkalnych)";"rynek wtórny";"od 80,1 m2";"";"zł";5974;`
    var counter = 0;
    var ceny = [];
    var cena = '';
    module.exports = function wykonaj(){
        // for (let index = 0; index < data.length; index++) {
        //     if (data[index] == ';'){
        //         counter++;
        //         continue;
        //     } 
            
        //     if (counter == 8) {
        //         cena += data[index];
        //         console.log(cena);
        //         if (data[index +1] == ';') {
        //             ceny.push(cena);
        //             counter = -1;
                    
        //             var sql = `insert into nieruchomosci (miasto,cena) Values ('Kraków',${cena})`;
        //             console.log(sql)
        //             connection.query(sql, function (err, result) {
        //                 if (err) throw err;
        //                 console.log("1 record inserted");
        //             });
        //             cena = ''
        //         }
                
        //     }
            
        // }
      
    }
    
    
    console.log(ceny)