import React from "react";
import { CircularProgress, Grid } from "@mui/material";
import Box from "@mui/material/Box";

export default function loader() {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      height="10vh"
    >
      <CircularProgress color="inherit"  />
    </Grid>
  );
}