import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Logo from "../assets/LogoBlue";
import Wave from "react-wavify";

const theme = createTheme();

export default function SignInSide() {
  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={8}
          md={4}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Wave
            className="wave"
            fill="#3ba59a"
            paused={false}
            options={{
              height: 20,
              amplitude: 45,
              speed: 0.1,
              points: 5,
            }}
          />
          <Logo width="13rem" />
          <Typography
            variant="h3"
            component="div"
            style={{
              marginTop: "0.5rem",
              color: "#3ba59a",
            }}
          >
            Azaan App
          </Typography>
          <Typography
            variant="blockquote"
            component="div"
            style={{
              fontWeight: "bold",
              fontSize: "1.6rem",
              padding: "1.5rem 0.5rem",
            }}
          >
            <blockquote cite="">
              A man asked ProPhet Muhammad Peace be upon Him What kinds of deeds
              are best in the sight of God. he replied To pray on Time.
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
                width: "8rem",
              }}
              variant="contained"
            >
              Al Quran
            </Button>
          </Link>
        </Grid>

        <Grid
          item
          xs={false}
          sm={4}
          md={8}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random/900×700/?mosque)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
    </ThemeProvider>
  );
}
