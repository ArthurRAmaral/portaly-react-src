import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import useStyles from "./style";

const TOKEN =
  "pk.eyJ1IjoibWF0aGV1c2ZmbSIsImEiOiJja2E0YTR2am4weW9zM2xyM2JuY3VhemU0In0.bVG00HR8OkvX0KqtDM7OKA";

mapboxgl.accessToken = TOKEN;

const Map = () => {
  const classes = useStyles();
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-43.996145, -19.830116],
      zoom: 16,
    });

    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    return () => map.remove();
  }, []);

  return <div className={classes.map} ref={mapContainerRef} />;
};

export default Map;
