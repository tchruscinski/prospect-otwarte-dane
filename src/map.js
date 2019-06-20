let map = document.querySelector('#map');
let markers = [
  {
    'name': 'Warszawa',
    'coordinates':{
      lat: 52.237049,
      lng: 21.017532
    }
  },
  {
    'name': 'Poznan',
    'coordinates':{
      lat: 52.409538,
      lng: 16.931992
    }
  },
  {
    'name': 'Gdansk',
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
    'name': 'Krakow',
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
      //setUpMarkerListener(mapMarker);
    }
}

/**
* Function handles click event on map marker
*/
function handleMarkerClick(cityName) {
  console.log(cityName);
}

/**
* Function fetching all job offers from the db
*/
function fetchAllJobOffers(){
  fetch('http://localhost:3000/data').then(function(response) {
      return response.json();
  }).then(function(myJson) {
    console.log(JSON.stringify(myJson));
  });
}
