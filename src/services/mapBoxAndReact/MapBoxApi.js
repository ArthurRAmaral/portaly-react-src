//https://api.mapbox.com/geocoding/v5/mapbox.places-permanent/fairbanks,alaska;aslkdjf;juno,alaska.json?access_token=YOUR_MAPBOX_ACCESS_TOKEN&limit=1
import mapboxgl from "mapbox-gl";

const token =
  "pk.eyJ1IjoibWF0aGV1c2ZmbSIsImEiOiJja2E0YTR2am4weW9zM2xyM2JuY3VhemU0In0.bVG00HR8OkvX0KqtDM7OKA";

mapboxgl.accessToken = token;

const tax = 1.5;

const calculaDistancia = (first, second) => {
  const start = new mapboxgl.LngLat(-43.996145, -19.832106);
  const destiny = new mapboxgl.LngLat(first, second);
  return start.distanceTo(destiny);
};

const calcTax = async (search) => {
  let binData = null;
  let distance = null;

  await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?types=address&proximity=-43.996145,-19.832106&access_token=${token}`
  )
    .then((result) => result.json())
    .then((data) => {
      binData = data;
      distance = calculaDistancia(
        binData.features[0].center[0],
        binData.features[0].center[1]
      );
    });
  return distance;
};

const calcPlace = async (search) => {
  let place = null;

  await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?types=address&proximity=-43.996145,-19.832106&access_token=${token}`
  )
    .then((result) => result.json())
    .then((data) => {
      place = data.features[0].place_name;
    });
  return place;
};

const mapbox = {
  getTax: async (search) => {
    let distance = null;

    await calcTax(search).then((data) => (distance = data));

    distance = (distance / 1000).toFixed(3);

    const shipping = (distance * tax).toFixed(2);

    return shipping;
  },
  getPlace: async (search) => {
    let place = null;

    await calcPlace(search).then((data) => (place = data));
    return place;
  },
};

export default mapbox;
