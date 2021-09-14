import {
  Paper,
  CircularProgress,
  TextField,
  makeStyles,
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
    padding: "1em",
  },
}));

function FilterSection(props) {
  const { locationValue, handleLocationValueChange } = props;

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
    <Paper className={classes.formGroup}>
      <Autocomplete
        inputValue={locationInputValue}
        onInputChange={handleLocationInputChange}
        value={locationValue}
        onChange={handleLocationValueChange}
        options={fetchLocationStatus === "success" ? locationResults : []}
        loading={fetchLocationStatus === "loading"}
        getOptionLabel={(option) => option.name}
        getOptionSelected={(option, value) =>
          option.lat === value.lat && option.lon === value.lon
        }
        style={{ minWidth: 200 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="City"
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
    </Paper>
  );
}

export default FilterSection;
