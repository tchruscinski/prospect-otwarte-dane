function drawcharts(){
  fetchData();
}

function compareSalaries(json){
    google.charts.load("current", {packages:['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    let array = [];
    array.push(["Element", "Zarobki", { role: "style" } ]);
    console.log(json);
    for(let i = 0; i < json.data.length; i++){
      array.push([json.data[i].miasto, json.data[i].wynagrodzenie_brutto, "#"+((1<<24)*Math.random()|0).toString(16)]);
    }
    console.log(array);
    function drawChart() {
      var data = google.visualization.arrayToDataTable(array);

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);

      var options = {
        title: "Średnie zarobki brutto",
        width: 600,
        height: 400,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
      };
      var chart = new google.visualization.ColumnChart(document.getElementById("compare-salaries"));
      chart.draw(view, options);
  }
}

function compareProperties(json){
    google.charts.load("current", {packages:['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    let array = [];
    array.push(["Element", "Cena m2", { role: "style" } ]);
    console.log(json);
    for(let i = 0; i < json.data.length; i++){
      array.push([json.data[i].miasto, json.data[i].cenam2, "#"+((1<<24)*Math.random()|0).toString(16)]);
    }
    console.log(array);
    function drawChart() {
      var data = google.visualization.arrayToDataTable(array);

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);

      var options = {
        title: "Średnie cena m2 mieszkania",
        width: 600,
        height: 400,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
      };
      var chart = new google.visualization.ColumnChart(document.getElementById("compare-properties"));
      chart.draw(view, options);
  }
}


/**
* Function fetching all job offers from the db
*/
function fetchData(){
  fetch('http://localhost:3000/data/allCities').then(function(response) {
      return response.json();
  }).then(function(myJson) {
    data = JSON.stringify(myJson);
    console.log(data);
    compareSalaries(myJson);
    compareProperties(myJson);
  });
}
