import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Logo from "../assets/LogoBlue";
import Autocomplete from "react-google-autocomplete";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
const theme = createTheme();

export default function SignInSide() {
  const [state, setState] = useState({
    address: "",
  });
  const handleChange = (address) => {
    setState({ ...state, address: address });
  };
  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Error", error));
  };
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          backgroundImage:
            "url(https://source.unsplash.com/random/900×400/?mosque)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60vh",
        }}
      ></div>
      {/* <Autocomplete
        apiKey={"AIzaSyAKB2FsqaJrptmP0dDSkzqL8DzVAX8PplU"}
        onPlaceSelected={(place) => {
          console.log(place);
        }}
      /> */}
      <Grid container>
        <CssBaseline />
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              marginTop: "-7rem",
              backgroundColor: "#fff",
              padding: "1.9rem",
              borderRadius: "50%",
            }}
          >
            <Logo width="13rem" />
          </div>
          <Typography
            variant="h3"
            component="div"
            style={{
              marginTop: "0.5rem",
              color: "#3ba59a",
            }}
          >
            World Azan Time
          </Typography>
          <Typography
            variant="blockquote"
            component="div"
            style={{
              fontWeight: "bold",
              fontSize: "1.6rem",
              padding: "1.5rem 0.5rem",
              width: " clamp(70%, 85vw, 40%)",
            }}
          >
            <blockquote cite="">
              A man asked ProPhet Muhammad Peace Be Upon Him What kinds of deeds
              are best in the sight of God. He replied To pray on time.
              <br />{" "}
              <span style={{ fontWeight: "bold", color: "#3ba59a" }}>
                – Sahih Bukhari
              </span>
            </blockquote>
          </Typography>
          <Link href="/al-Quran" style={{ textDecoration: "none" }}>
            <Button
              style={{
                backgroundColor: "#FEC265",
                fontWeight: "bold",
                color: "black",
                width: "10rem",
              }}
              variant="contained"
            >
              Al Quran
            </Button>
          </Link>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
