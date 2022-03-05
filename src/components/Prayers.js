import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Calender from "./Calender";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Datetime from "react-datetime";
import "./1.css";
import { getTime, getFivePrayers } from "../functions/time";
import { getPrayerTime1 } from "../functions/upcomingTime";
import { getUserLocation, getCalender } from "../services/api";
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
  const [location, setLocation] = useState({});
  const [type, setType] = useState(0);
  const [calenderData, setCalenderData] = useState([]);
  const getLocation = async () => {
    try {
      let { data } = await getUserLocation();
      setLocation(data);
      console.log(data);
      data && getPrayerTime(data.country, data?.latitude, data?.longitude);
    } catch (error) {
      console.log(error);
    }
  };

  const getPrayerTime = async (country) => {
    try {
      let { data } = await getCalender(
        country,
        moment.unix(time).format("M"),
        moment.unix(time).format("YYYY"),
        type
      );
      setCalenderData(data?.data);
      data.data.map((item, i) => {
        if (i === parseInt(moment().format("DD")) - 1) {
          setData(item);
          setDay(item.date?.hijri?.day);
          setMonth(item.date?.hijri?.month.en);
          setYear(item.date?.hijri?.year);
          setEnglishDate(
            `${item.date.gregorian.weekday.en}, ${item.date.gregorian.day} ${item.date.gregorian.month.en} ${item.date.gregorian.year}`
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, [time, type]);

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
                ({day} {month} {year} )
              </span>
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={6}>
          <Grid
            item
            xs={12}
            sm={7}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {location && (
              <Calender
                calenderData={calenderData}
                location={location?.country}
                set={setType}
                type={type}
              />
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={5}
            style={{
              flex: "1",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Item>
              <Typography variant="h4" style={{ color: "#3ba59a" }}>
                Prayer Times by date
              </Typography>
              <Datetime
                timeFormat={false}
                input={false}
                name="expiration_time"
                onChange={(e) => setTime(moment(e).unix())}
              />
            </Item>
            <div className="prayers-heading">
              <p>Salah</p>
              <p>Begins</p>
            </div>
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
            {getFivePrayers(data?.timings).map(({ prayer, time }, i) => (
              <Button
                style={{
                  backgroundColor:
                    getPrayerTime1(getFivePrayers(data?.timings)) === prayer
                      ? "#3ba59a"
                      : "#fff",
                  color:
                    getPrayerTime1(getFivePrayers(data?.timings)) === prayer
                      ? "#fff"
                      : "black",
                }}
                className="prayer-btn"
                variant="contained"
                fullWidth
                key={i}
              >
                <div>{prayer}</div>
                {getPrayerTime1(getFivePrayers(data?.timings)) === prayer && (
                  <div>{`Next Prayer`}</div>
                )}
                <div>{getTime(time)}</div>
              </Button>
            ))}
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
            {/* <Item style={{ marginTop: "3rem" }}>
            </Item> */}
            {/* <Item>

              <Typography variant="h4" style={{ color: "#3ba59a" }}>
                Recite Holy Quran
              </Typography>

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
                  Al-Quran
                </Button>
              </Link>
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
            </Item> */}
          </Grid>
        </Grid>
      </Grid>
      <div style={{ width: "100%", height: "100px" }}></div>
    </div>
  );
};

export default Prayers;
