import React, { useEffect, useState, useRef } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import { getChargesData } from "./api";
import { mockData } from "./data/data";
import Header from "./components/HeaderLogo/Header";

import FilterPanel from "./components/FilterPanel/FilterPanel";
import MapGoogle from "./components/GoogleMap/MapGoogle";

import "./App.css";

const App = ({ classes }) => {
  const [chargerCoords, setChargerCoords] = useState({});

  //----DATA DROPDOWNS---///

  const [markList, setMarkList] = useState(Object.keys(mockData.data));
  const [modelList, setModelList] = useState([]);
  const [selectedMark, setSelectedMark] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedModelDetails, setSelectedModelDetails] = useState([]);
  const [showDistance, setShowDistance] = useState(false);

  useEffect(() => {
    const changeState = (e) => {
      if (selectedMark) {
        setModelList(Object.keys(mockData.data[selectedMark].models));
      }
    };
    changeState();
  }, [selectedMark]);

  useEffect(() => {
    const carDetails = (e) => {
      if (selectedModel) {
        setSelectedModelDetails(
          mockData.data[selectedMark].models[selectedModel]
        );
      }
    };
    carDetails();
  }, [selectedModel]);

  ////-----END OF DROPDOWNS ------////

  const google = window.google;

  const [charges, setCharges] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("trip");

  const handleSelectCategory = (event, value) =>
    !value ? null : setSelectedCategory(value);

  const [coordinates, setCoordinates] = useState({});

  const [childClicked, setChildClicked] = useState(null);

  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  // //---Calculate Route GoogleMap ----//
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distanceAB, setDistanceAB] = useState("");
  const [distanceAC, setDistanceAC] = useState("");

  const [durationAB, setDurationAB] = useState("");
  const [durationAC, setDurationAC] = useState("");

  const [betweenStop, setBetweenStop] = useState({});

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  const waypoints = useRef();

  const calculatIntermRoute = () => {
    const directionsService = new google.maps.DirectionsService();
    var andress = [];

    if (betweenStop.charge?.AddressInfo !== undefined) {
      andress.push(
        betweenStop.charge.AddressInfo.AddressLine1 +
          "," +
          betweenStop.charge.AddressInfo.Town +
          "," +
          betweenStop.charge.AddressInfo.Country.Title
      );
    }
    andress.length !== 0 &&
      directionsService.route(
        {
          origin: originRef.current.value,
          destination: destiantionRef.current.value,
          travelMode: google.maps.TravelMode.DRIVING,
          waypoints: [{ location: andress[0], stopover: true }],
        },
        (results, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            //changing the state of directions to the result of direction service
            setDirectionsResponse(results);

            setCoordinates({
              lat: results.routes[0].legs[0].end_location.lat(),
              lng: results.routes[0].legs[0].end_location.lng(),
            });

            // setShowDistance(true);
            setDistanceAB(results.routes[0].legs[0].distance.text.slice(0, 4));
            setDurationAB(results.routes[0].legs[0].duration.text);
          } else {
            console.error(`error fetching directions ${results}`);
          }
        }
      );
  };

  async function calculateRoute() {
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: originRef.current.value,
        destination: destiantionRef.current.value,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (results, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          //changing the state of directions to the result of direction service
          setDirectionsResponse(results);

          setCoordinates({
            lat: parseFloat(results.routes[0].legs[0].end_location.lat()),
            lng: parseFloat(results.routes[0].legs[0].end_location.lng()),
          });
          // setShowDistance(true);
          setDistanceAC(results.routes[0].legs[0].distance.text.slice(0, 4));
          setDurationAC(results.routes[0].legs[0].duration.text);
        } else {
          console.error(`error fetching directions ${results}`);
        }
      }
    );
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistanceAB("");
    setDistanceAC("");
    setDurationAB("");
    setDurationAC("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
    setBetweenStop({});
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({
          lat: parseFloat(latitude),
          lng: parseFloat(longitude),
        });
      }
    );
  }, []);

  useEffect(() => {
    if (coordinates.lat && coordinates.lng) {
      getChargesData(coordinates.lat, coordinates.lng).then((data) => {
        setCharges(data);
      });
    }
  }, [coordinates]);

  const categoryList = [
    {
      id: 1,
      value: "trip",
      label: "Trip",
    },
    {
      id: 2,
      value: "explore",
      label: "Explore",
    },
  ];

  return (
    <>
      <CssBaseline />

      <Header />
      <div className="btnGrid"></div>

      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={5}>
          <FilterPanel
            setDistanceAC={setDistanceAC}
            setDirectionsResponse={setDirectionsResponse}
            calculatIntermRoute={calculatIntermRoute}
            open={open}
            childClicked={childClicked}
            setOpen={setOpen}
            betweenStop={betweenStop}
            setBetweenStop={setBetweenStop}
            showDistance={showDistance}
            charges={charges}
            getChargesData={getChargesData}
            map={map}
            setMap={setMap}
            distanceAB={distanceAB}
            setDistanceAB={setDistanceAB}
            distanceAC={distanceAC}
            durationAB={durationAB}
            setDurationAB={setDurationAB}
            durationAC={durationAC}
            setDurationAC={setDurationAC}
            originRef={originRef}
            destiantionRef={destiantionRef}
            waypoints={waypoints}
            calculateRoute={calculateRoute}
            clearRoute={clearRoute}
            coordinates={coordinates}
            setSelectedModel={setSelectedModel}
            selectedModel={selectedModel}
            setSelectedMark={setSelectedMark}
            selectedMark={selectedMark}
            setModelList={setModelList}
            modelList={modelList}
            setMarkList={setMarkList}
            markList={markList}
            selectedModelDetails={selectedModelDetails}
          />
        </Grid>

        <Grid item xs={12} md={7}>
          <MapGoogle
            setOpen={setOpen}
            setSelectedCategory={setSelectedCategory}
            setBetweenStop={setBetweenStop}
            betweenStop={betweenStop}
            setChargerCoords={setChargerCoords}
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            charges={charges}
            setChildClicked={setChildClicked}
            directionsResponse={directionsResponse}
            setDirectionsResponse={setDirectionsResponse}
            // calculateRoute={calculateRoute}
            clearRoute={clearRoute}
            setMap={setMap}
            originRef={originRef}
            destiantionRef={destiantionRef}
            map={map}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
