import { icon } from 'leaflet';

export const placeIcon = icon({
  iconUrl: 'assets/icons/markers/place-marker.png',
  shadowUrl: 'assets/icons/markers/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


export const userIcon = icon({
  iconUrl: 'assets/icons/markers/user-marker.png',
  shadowUrl: 'assets/icons/markers/marker-shadow.png',
  iconSize: [24, 28],
  iconAnchor: [10, 28],
  popupAnchor: [1, -28],
  shadowSize: [32, 28]
});

export const highlightedUserIcon = icon({
  iconUrl: 'assets/icons/markers/highlighted-user-marker.png',
  shadowUrl: 'assets/icons/markers/marker-shadow.png',
  iconSize: [24, 28],
  iconAnchor: [10, 28],
  popupAnchor: [1, -28],
  shadowSize: [32, 28]
});
