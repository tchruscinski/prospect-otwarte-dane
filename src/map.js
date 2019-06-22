let map = document.querySelector('#map'),
    infoHeader = document.querySelector('#info-header'),
    cellAverageIncome = document.querySelector('.average-income'),
    cellPercentageIncome = document.querySelector('.percentage-income'),
    unemploymentPercentage = document.querySelector('.unemployment'),
    averageSquarePrice = document.querySelector('.price-m2'),
    offersPerPerson = document.querySelector('.job-offers'),
    attractiveFactor = document.querySelector('.attractive-factor'),
    growthFactor = document.querySelector('.growth-factor'),
    incomeCells = document.getElementsByClassName('income'),
    workCells = document.getElementsByClassName('work'),
    factorCells = document.getElementsByClassName('factors'),
    propertiesCells = document.getElementsByClassName('properties');



let markers = [
  {
    'name': 'Warszawa',
    'coordinates':{
      lat: 52.237049,
      lng: 21.017532
    }
  },
  {
    'name': 'Poznań',
    'coordinates':{
      lat: 52.409538,
      lng: 16.931992
    }
  },
  {
    'name': 'Gdańsk',
    'coordinates':{
      lat: 54.372158,
      lng: 18.638306
    }
  },
  {
    'name': 'Katowice',
    'coordinates':{
      lat: 50.270908,
      lng: 19.039993
    }
  },
  {
    'name': 'Kraków',
    'coordinates':{
      lat: 50.049683,
      lng: 19.944544
    }
  },
  {
    'name': 'Szczecin',
    'coordinates':{
      lat: 53.428543,
      lng: 14.552812
    }
  },
  {
    'name': 'Lublin',
    'coordinates':{
      lat: 51.246452,
      lng: 22.568445
    }
  },
  {
    'name': 'Łódź',
    'coordinates':{
      lat: 51.759445,
      lng: 19.457216
    }
  },
  {
    'name': 'Wrocław',
    'coordinates':{
      lat: 51.107883,
      lng: 17.038538
    }
  }
];

/**
* Function inits script structure on page load
*/

// function initPage() {
//   setUpMarkerListeners(markers);
//   console.log('hello');
// }

/**
* Listeners
*/
// map.addEventListener('click', function(){
//   fetchAllJobOffers();
// });

/**
* Function initializing the map
*/
function initMap() {
  let warsaw = {lat: 52.237049, lng: 21.017532};
  let map = new google.maps.Map(document.getElementById('map'), {zoom: 4, center: warsaw});
  printMarkers(markers, map);
}

/**
* Function printing marker on the map
*/
function printMarkers(markers, map) {
    for(let i = 0; i < markers.length; i++) {
      let markerPosition = {lat: markers[i].coordinates.lat, lng: markers[i].coordinates.lng};
      let mapMarker = new google.maps.Marker({position: markerPosition, map: map});
      mapMarker.addListener('click', function() {
        map.setZoom(8);
        map.setCenter(mapMarker.getPosition());
        handleMarkerClick(markers[i].name)
      });
    }
}

/**
* Function handles click event on map marker
*/
function handleMarkerClick(cityName) {
  infoHeader.innerHTML = cityName;
  for(var i = 0; i < incomeCells.length; i++){
    incomeCells[i].style.visibility = 'visible';
    workCells[i].style.visibility = 'visible';
    propertiesCells[i].style.visibility = 'visible';
    factorCells[i].style.visibility = 'visible';
  }
  fetchData(cityName);
}

/**
* Function fetching all job offers from the db
*/
function fetchData(city){
  fetch('http://localhost:3000/data/allData/' + city).then(function(response) {
      return response.json();
  }).then(function(myJson) {
    data = JSON.stringify(myJson);
    console.log(data);
    populateFieldsWithData(myJson);
  });
}

/**
* Function populates fields on front end with thata that was fetched from the server
*/
function populateFieldsWithData(fetchedData){
  animateValue(cellAverageIncome, 0, Math.round(fetchedData.data[0].wynagrodzenie));
  animateValue(cellPercentageIncome, 0, Math.round(fetchedData.data[0].wynagrodznieRelacja));
  animateValue(unemploymentPercentage, 0, Math.round(fetchedData.data[0].stopaBezrobocia));
  animateValue(offersPerPerson, 0, Math.round(1000 * fetchedData.data[0].ofertyPracyNaMieszkanca));
  animateValue(averageSquarePrice, 0, Math.round(fetchedData.data[0].cenam2));
  populateGrowthFactor(fetchedData.data[0].wspMatiego);
  animateValue(attractiveFactor, 0, Math.round(fetchedData.data[0].wspTomka));
  createPieChart(fetchedData);
}

/**
* Function animates number increasing sequence
*/
function animateValue(element, start, end) {
    var current = start;
    var increment = 100;
    var timer = setInterval(function() {
      if(end - current <= 100 && end - current > 10){
        increment = 10;
      } else if (end - current <= 10) {
        increment = 1;
      }
      current += increment;
      element.innerHTML = current;
      if (current == end) {
          clearInterval(timer);
          return;
      }
    }, 10);
}

/**
* Function populates growth factor field
*/
function populateGrowthFactor(value){
  if(value > 1){
    growthFactor.innerHTML = 'Rosnący';
    growthFactor.style.color = '#5dd95d';
  } else if(value < 1){
    growthFactor.innerHTML = 'Malejący';
    growthFactor.style.color = '#ff0000';
  } else{
    growthFactor.innerHTML = 'Stały';
  }
}

/**
* Function creates pie chart
*/
function createPieChart(json){
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);

  let array = [];
  array.push(['Sektor', 'Udział']);
  array.push(['Rolnictwo', json.data[0].zatrudnieniRolnictwo]);
  array.push(['Przemysł', json.data[0].zatrudnieniPrzemysl]);
  array.push(['Usługi', json.data[0].zatrudnieniUslugi]);

  // Draw the chart and set the chart values
  function drawChart() {
    //tutaj dac argument tego : data
    var data = google.visualization.arrayToDataTable(array);

    // Optional; add a title and set the width and height of the chart
    var options = {'title':'Osoby zatrudnione w sektorach', 'width':550, 'height':400};

    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
  }
}
