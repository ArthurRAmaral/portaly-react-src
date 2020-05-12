//https://api.mapbox.com/geocoding/v5/mapbox.places-permanent/fairbanks,alaska;aslkdjf;juno,alaska.json?access_token=YOUR_MAPBOX_ACCESS_TOKEN&limit=1
import mapboxgl from "mapbox-gl";

const token =
  "pk.eyJ1IjoibWF0aGV1c2ZmbSIsImEiOiJja2E0YTR2am4weW9zM2xyM2JuY3VhemU0In0.bVG00HR8OkvX0KqtDM7OKA";

mapboxgl.accessToken = token;

const calculaDistancia = (first, second) => {
  const start = new mapboxgl.LngLat(-44.120926, -19.919362);
  const destiny = new mapboxgl.LngLat(first, second);
  return start.distanceTo(destiny);
};

const makeRequest = (search) => {
  let request = new XMLHttpRequest();
  request.open(
    "GET",
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?types=address&proximity=-122.39738575285674,37.7925147111369453&access_token=${token}`
  );
  request.send();
  request.onload = () => {
    if (request.status == 200) {
      const result = JSON.parse(request.response);
      return calculaDistancia(
        result.features[0].center[0],
        result.features[0].center[1]
      );
    } else {
      console.log("erro");
    }
  };
};

const calcTax = (search) => {
  const distance = makeRequest(search);
  console.log("PRECISO DESSE ", distance);
};

const mapbox = {
  chamar: () => {
    const distance = calcTax(
      "Rua%20Das%20Quaresmeiras%20Contagem%20Minas%20Gerais"
    );
    console.log(distance);
  },
};

export default mapbox;
