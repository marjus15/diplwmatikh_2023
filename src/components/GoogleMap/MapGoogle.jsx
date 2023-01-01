import React from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  MarkerClusterer,
} from "@react-google-maps/api";
import useStyles from "./styles";
import mapStyles from "./mapStyles";
import { Box, HStack } from "@chakra-ui/react";
import { Paper, Typography } from "@material-ui/core";

function MapGoogle({
  setCoordinates,
  coordinates,
  setChildClicked,
  charges,
  setMap,
  directionsResponse,
  setChargerCoords,
  setBetweenStop,
  setOpen,
}) {
  const classes = useStyles();

  return (
    <div className={classes.mapContainer}>
      {/* Google Map Box */}
      <GoogleMap
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        center={coordinates}
        margin={[50, 50, 50, 50]}
        zoom={7}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{
          disableDefaultUI: true,
          zoomControl: false,
          styles: mapStyles.styles,
        }}
        onChildClick={(child) => setChildClicked(child)}
        onClick={(ev, i) => {
          setCoordinates({
            lat: parseFloat(ev.latLng.lat()),
            lng: parseFloat(ev.latLng.lng()),
          });
          // setBounds({ ne: ev.marginBounds.ne, sw: ev.marginBounds.sw });
        }}
        onLoad={(map) => setMap(map)}
      >
        <MarkerClusterer>
          {(clusterer) =>
            charges?.map((charge, i) => (
              <Marker
                onClick={() => {
                  setOpen((prevTrue) => !prevTrue);
                  setBetweenStop({
                    charge,
                  });

                  // setSelectedCategory("explore");
                  setChargerCoords({
                    // location: charge.AddressInfo,
                    lat: parseFloat(charge.AddressInfo.Latitude.toFixed(7)),
                    lng: parseFloat(charge.AddressInfo.Longitude.toFixed(7)),
                  });
                  setChildClicked(i);
                }}
                key={i}
                position={{
                  lat: parseFloat(charge.AddressInfo.Latitude),
                  lng: parseFloat(charge.AddressInfo.Longitude),
                }}
                clusterer={clusterer}
              />
            ))
          }
        </MarkerClusterer>

        <Marker position={coordinates} />
        {directionsResponse !== null && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    </div>
  );
}

export default MapGoogle;
