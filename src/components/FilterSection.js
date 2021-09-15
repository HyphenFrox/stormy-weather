import {
  Paper,
  CircularProgress,
  TextField,
  makeStyles,
  FormGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { Autocomplete } from "@material-ui/lab";
import { useQuery } from "react-query";

//
import fetchLocation from "../services/fetchLocation";
//

const useStyles = makeStyles((theme) => ({
  formGroup: {
    "& > *": {
      margin: "1em",
    },
  },
  locationInput: {
    minWidth: 200,
    [theme.breakpoints.up("sm")]: {
      minWidth: 300,
    },
  },
  unitSelect: {
    minWidth: 50,
  },
}));

function FilterSection(props) {
  const {
    locationValue,
    handleLocationValueChange,
    unit,
    handleUnitChange,
    isNearbyWeatherOn,
    handleIsNearbyWeatherOnChange,
  } = props;

  // filter input state
  const [locationInputValue, setLocationInputValue] = useState("");
  const handleLocationInputChange = (...args) => {
    const [, newValue] = args;
    setLocationInputValue(newValue);
  };
  //

  // fetch location results
  const {
    status: fetchLocationStatus,
    error: fetchLocationError,
    data: locationResults,
  } = useQuery(["fetchLocation", locationInputValue], fetchLocation);
  //

  if (fetchLocationStatus === "error") console.log(fetchLocationError);

  const classes = useStyles();

  return (
    <Paper>
      <FormGroup className={classes.formGroup} row>
        <Autocomplete
          className={classes.locationInput}
          disabled={isNearbyWeatherOn}
          inputValue={locationInputValue}
          onInputChange={handleLocationInputChange}
          value={locationValue?.type === "select" ? locationValue.value : null}
          onChange={handleLocationValueChange}
          options={fetchLocationStatus === "success" ? locationResults : []}
          loading={fetchLocationStatus === "loading"}
          getOptionLabel={(option) => option.name}
          getOptionSelected={(option, value) =>
            option.lat === value.lat && option.lon === value.lon
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="City"
              placeholder="eg. Berlin"
              name="city"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {fetchLocationStatus === "loading" ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
        <FormControl className={classes.unitSelect}>
          <InputLabel id="unit-select-label">Unit</InputLabel>
          <Select
            labelId="unit-select-label"
            id="unit"
            value={unit}
            onChange={handleUnitChange}
          >
            <MenuItem value={"metric"}>Metric</MenuItem>
            <MenuItem value={"imperial"}>Imperial</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Switch
              checked={isNearbyWeatherOn}
              onChange={handleIsNearbyWeatherOnChange}
              name="nearbyWeather"
              color="primary"
            />
          }
          label="Nearby Weather"
        />
      </FormGroup>
    </Paper>
  );
}

export default FilterSection;
