const camp = campground;
const coordinates = camp.geometry.coordinates;

mapboxgl.accessToken = mapboxToken;
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v12', // style URL
  center: coordinates, // starting position [lng, lat]
  zoom: 9, // starting zoom
});

const marker = new mapboxgl.Marker()
  .setLngLat(coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 20 }).setHTML(
      `<h4>${camp.title}</h4>
       <p>Location: ${camp.location}</p>
       <p>Price: $${camp.price} per night</p>`,
    ),
  )
  .addTo(map);
map.addControl(new mapboxgl.NavigationControl());
