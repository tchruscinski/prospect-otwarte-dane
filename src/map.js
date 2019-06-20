let map = document.querySelector('#map');

/**
* Listeners"
*/
map.addEventListener('click', function(){
  fetchAllJobOffers();
});

/**
* Function initializing the map with a test marker
*/
function initMap() {
  // The location of Uluru
  var warsaw = {lat: 52.237049, lng: 21.017532};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4, center: warsaw});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: warsaw, map: map});
}

/**
* Function fetching all job offers from the db
*/
function fetchAllJobOffers(){
  fetch('http://localhost:3000/data', {
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/json',
      'X-Content-Type-Options': 'nosniff'
  }
  }).then(function(response) {
      return response.json();
  }).then(function(myJson) {
    console.log(JSON.stringify(myJson));
  });
}
