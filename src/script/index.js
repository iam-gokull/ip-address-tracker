import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import '../styles/style.css';
import '../styles/reset.css';

import searchIcon from '../images/icon-arrow.svg';
import locIcon from '../images/icon-location.svg';
import headerBgImg from '../images/pattern-bg-desktop.png';


import { loadData } from './apiFunctions';

const displayIpAddress = document.getElementById('ip-address');
const displayLocation = document.getElementById('location');
const displayTimezone = document.getElementById('timezone');
const displayIsp = document.getElementById('isp');

const form = document.getElementById('ip-form');
const ipInput = document.getElementById('search-input');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    loadData(ipInput.value)
})

const map = L.map('map');

const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(map);

document.querySelector('.search-icon').src = searchIcon;
loadData();

const locationIcon = L.icon({
    iconUrl: locIcon,
    iconSize: [35, 35],
    iconAnchor: [15, 15]
});

const marker = L.marker([0, 0], {icon: locationIcon}).addTo(map);

export function renderResults(data) {
    if (data.error) {
        throw(data.reason);
    }

    displayIpAddress.textContent = data.ip;
    displayLocation.textContent = `${data.city}, ${data.region}, ${data.country_name}`;
    if (data.utc_offset !== null) {
        displayTimezone.textContent = 'UTC: ' + data.utc_offset.slice(0, 3) + ':' + data.utc_offset.slice(3);
    }
    else {
        displayTimezone.textContent = data.timezone;
    }
    displayIsp.textContent = data.org;
    map.setView([data.latitude, data.longitude], 13);
    marker.setLatLng([data.latitude, data.longitude]);
    marker.bindPopup(`<b>${data.ip}</b>`).openPopup();
}
