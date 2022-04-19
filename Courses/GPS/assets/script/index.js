'use strict';

function showLocation(position) {
    const {longitude, latitude, accuracy} = position.coords;
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [longitude, latitude],
        zoom: 18,
        interactive: false
    })

    let markerHtml = document.createElement('div');
    markerHtml.className = 'marker';

    const userPos = new mapboxgl.Marker(markerHtml).setLngLat([longitude, latitude]).addTo(map);
}

function errorHandler() {
    console.log('Nope');
}

navigator.geolocation.watchPosition(showLocation, errorHandler, {enableHighAccuracy: true});

mapboxgl.accessToken = `pk.eyJ1IjoiemFibG9vIiwiYSI6ImNsMXdnYTU5bjExNjgza3FmajI5bmhod2UifQ.qJdSGaRsneTmXPttoiPG3Q`;

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

// We listen to the resize event
window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

