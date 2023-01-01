import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";

// import Rating from "@material-ui/lab/Rating";
import PhoneIcon from "@material-ui/icons/Phone";
import useStyles, { theme } from "./styles";
import FlagIcon from "@material-ui/icons/Flag";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import EvStationIcon from "@material-ui/icons/EvStation";

const PlaceDetails = ({ place, selected, refProp, charge }) => {
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const [url, setUrl] = useState("");

  const [description, setDescription] = useState([]);
  const [levelComments, setLevelComments] = useState([]);
  const [fastCharge, setFastCharge] = useState([]);

  useEffect(() => {
    if (
      charge?.AddressInfo?.RelatedURL !== null &&
      charge?.AddressInfo?.RelatedURL !== undefined
    ) {
      setUrl(charge?.AddressInfo?.RelatedURL);
    }

    if (
      charge.Connections[0].Level !== null &&
      charge.Connections[0].Level !== undefined
    ) {
      if (charge.Connections[0].Level.IsFastChargeCapable === false) {
        setFastCharge("Not Capable for Fast Charge");
      } else if (charge.Connections[0].Level.IsFastChargeCapable === true) {
        setFastCharge("Capable for Fast Charge");
      } else {
        setFastCharge("No Data");
      }
    }
    if (
      charge.Connections[0].Level !== null &&
      charge.Connections[0].Level !== undefined
    ) {
      setLevelComments(charge.Connections[0].Level.Comments);
    }
    if (
      charge.Connections[0].CurrentType !== null &&
      charge.Connections[0].CurrentType !== undefined
    ) {
      setDescription(charge.Connections[0].CurrentType.Title);
    }
  }, []);

  const classes = useStyles();

  if (selected)
    refProp?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

  return (
    <Card
      elevation={6}
      className={selected === true ? classes.selectedCard : false}
    >
      <CardContent>
        <Typography className={classes.ChargeName} gutterBottom variant="h6">
          {charge?.AddressInfo?.Title}
        </Typography>

        <Typography gutterBottom variant="overline">
          Cost:
        </Typography>

        <Typography gutterBottom variant="subtitle2">
          {charge.UsageCost}
        </Typography>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="overline">Usage Type:</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography gutterBottom variant="subtitle2">
            {charge?.UsageType?.Title}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography gutterBottom variant="overline">
            Connection Type:
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography gutterBottom variant="subtitle2">
            {charge?.Connections[0]?.ConnectionType.Title
              ? charge?.Connections[0]?.ConnectionType.Title
              : "No Data"}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography mt={2} gutterBottom variant="overline">
            Comments:
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography gutterBottom variant="subtitle2">
            {levelComments}
            <br />
            {description}
          </Typography>
        </Box>
        <br />
        {fastCharge && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            className={classes.spacing}
          >
            <EvStationIcon /> {fastCharge}
          </Typography>
        )}

        {charge?.AddressInfo.AddressLine1 && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            className={classes.spacing}
          >
            <LocationOnIcon /> {charge.AddressInfo.AddressLine1}
          </Typography>
        )}
        {charge?.AddressInfo.Country.Title && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            className={classes.spacing}
          >
            <FlagIcon /> {charge.AddressInfo.Country.Title}
          </Typography>
        )}
        {charge?.AddressInfo.Town && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            className={classes.spacing}
          >
            <LocationCityIcon /> {charge.AddressInfo.Town}
          </Typography>
        )}
        {charge?.AddressInfo.ContactTelephone1 && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            className={classes.spacing}
          >
            <PhoneIcon /> {charge.AddressInfo.ContactTelephone1}
          </Typography>
        )}

        <CardActions>
          {charge?.AddressInfo?.RelatedURL !== null ? (
            <Button
              size="small"
              color="primary"
              onClick={() => openInNewTab(url)}
            >
              Website
            </Button>
          ) : (
            "No Website For This Charger"
          )}
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;
