import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Datetime from "react-datetime";
import "./1.css";
import { getTime, getFivePrayers } from "../functions/time";
import { getUserLocation, getPrayerTimeApi } from "../services/api";
import moment from "moment";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: "1.5rem ",
  textAlign: "center",
  color: theme.palette.text.secondary,
  marginTop: "1.5rem",
}));

const Prayers = () => {
  const [data, setData] = useState([]);
  const [time, setTime] = useState(moment(new Date()).unix());
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [englishDate, setEnglishDate] = useState("");
  const getLocation = async () => {
    try {
      let { data } = await getUserLocation();
      data && getPrayerTime(time, data?.latitude, data?.longitude);
    } catch (error) {
      console.log(error);
    }
  };

  const getPrayerTime = async (country, latitude, longitude) => {
    try {
      let { data } = await getPrayerTimeApi(country, latitude, longitude);
      setData(data.data);
      setDay(data?.data?.date?.hijri?.day);
      setMonth(data?.data?.date?.hijri?.month);
      setYear(data?.data?.date?.hijri?.year);
      console.log(data?.data?.date);
      setEnglishDate(
        `${data?.data?.date.gregorian.weekday.en}, ${data?.data?.date.gregorian.day} ${data?.data?.date.gregorian.month.en} ${data?.data?.date.gregorian.year}`
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div id="prayers" className="prayers">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5} textAlign={"start"}>
          <Typography
            variant="h5"
            component="h2"
            style={{ fontWeight: "bold", fontSize: "1.7rem" }}
          >
            Azaan App give you daily prayer time as well as past and future
            time.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={7} textAlign={"start"}>
          <Typography
            variant="h5"
            component="h2"
            style={{ fontSize: "1.3rem" }}
          >
            The Salat is the Time when Meeting with Allah and the
            ascension(Mi-raj) of the believers takes place. we all know the
            importance of this obligatory act, and thus, we do not wish to delve
            ibto that area.
          </Typography>
        </Grid>
        <Grid container spacing={2} marginTop={"1rem"}>
          <Grid item xs={12}>
            <Typography style={{ fontSize: "1.5rem" }}>
              {englishDate}{" "}
              <span id="islamic-date">
                ({day} {month.en} {year} )
              </span>
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={7}>
            <Item>
              <Button
                style={{
                  backgroundColor: "#FEC265",
                }}
                className="prayer-btn"
                variant="contained"
                fullWidth
              >
                <div>Sun RIse</div>
                <div>
                  {data && data.timings && getTime(data?.timings?.Sunrise)}
                </div>
              </Button>
            </Item>
            <Item style={{ marginTop: "3rem" }}>
              <div className="prayers-heading">
                <p>Salah</p>
                <p>Begins</p>
              </div>
              {getFivePrayers(data?.timings).map(({ prayer, time }, i) => (
                <Button
                  style={{
                    backgroundColor: "#fff",
                  }}
                  className="prayer-btn"
                  variant="contained"
                  fullWidth
                  key={i}
                >
                  <div>{prayer}</div>
                  <div>{getTime(time)}</div>
                </Button>
              ))}
            </Item>
            <Item style={{ marginTop: "3rem" }}>
              <Button
                style={{
                  backgroundColor: "#121A41",
                  color: "#fff",
                }}
                className="prayer-btn"
                variant="contained"
                fullWidth
              >
                <div>Sun set</div>
                <div>
                  {data && data.timings && getTime(data?.timings?.Sunset)}
                </div>
              </Button>
            </Item>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Item>
              <Datetime
                input={false}
                name="expiration_time"
                timeFormat="HH:mm:ss"
                onChange={(e) => setTime(moment(e).unix())}
              />
            </Item>
            <Item style={{ marginTop: "3rem", padding: "4.45rem 1.5rem " }}>
              <Typography variant="h4" style={{ color: "#3ba59a" }}>
                Jummah Khutba Begins At
              </Typography>
              <Button
                style={{
                  backgroundColor: "#212830",
                  fontWeight: "bold",
                  padding: "1rem 3rem",
                  fontSize: "1.3rem",
                  borderRadius: "0.5rem",
                  marginTop: "1rem",
                  color: "#FEC265",
                }}
                variant="contained"
                fullWidth
              >
                1:30 PM
              </Button>
            </Item>
            <Item>
              <Link href="/al-Quran" style={{ textDecoration: "none" }}>
                <Button
                  style={{
                    backgroundColor: "#FEC265",
                    fontWeight: "bold",
                    color: "black",
                    padding: "1rem 3rem",
                    fontSize: "1.3rem",
                    borderRadius: "0.5rem",
                  }}
                  variant="contained"
                >
                  Recite Holy Quran
                </Button>
              </Link>
            </Item>
          </Grid>
        </Grid>
      </Grid>
      <div style={{ width: "100%", height: "100px" }}></div>
    </div>
  );
};

export default Prayers;
