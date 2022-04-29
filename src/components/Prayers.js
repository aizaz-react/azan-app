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
import {
  getUserLocation,
  getCalender,
  getPrayerTimeApi,
  getCityName,
} from "../services/api";
import moment from "moment";
import Wave from "react-wavify";
import { useDispatch, useSelector } from "react-redux";
import { calenderUpdate, addressInfo } from "../redux/reducers";
import Clock from "./clock";

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
  const [methodType, setMethodType] = useState(2);
  const [adjustment, setAdjustment] = useState(0);
  const { calenderData, address } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [filterDay] = calenderData.filter(
    (el) => el.date.gregorian.date === moment().format("DD-MM-YYYY")
  );
  const getCurrentCity = async (latitude, longitude) => {
    try {
      let { data } = await getCityName(latitude, longitude);
      let { compound_code } = data.plus_code;
      let result = compound_code.split(" ");
      result.shift();
      dispatch(addressInfo(result.join(",").replace(",", " ")));
      data && getPrayerTime(compound_code, latitude, longitude);
    } catch (error) {
      console.log(error);
    }
  };

  const getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          getCurrentCity(coords.latitude, coords.longitude);
        },
        (error) => {
          getLocation();
        },
        { timeout: 5000, enableHighAccuracy: true }
      );
    } else {
      getLocation();
    }
  };

  const getLocation = async () => {
    console.log("call");
    try {
      let { data } = await getUserLocation();
      setLocation(data);
      data && getPrayerTime(data.country, data?.latitude, data?.longitude);
    } catch (error) {
      console.log(error);
    }
  };

  const getPrayerTime = async (country, lang, long) => {
    try {
      let [{ data }, result] = await Promise.all([
        getCalender(
          country,
          moment.unix(time).format("M"),
          moment.unix(time).format("YYYY"),
          type,
          methodType,
          adjustment
        ),
        getPrayerTimeApi(time, lang, long, methodType, adjustment, type),
      ]);
      dispatch(calenderUpdate(data.data));
      setData(result?.data?.data);
      setDay(result?.data?.data.date?.hijri?.day);
      setMonth(result?.data?.data.date?.hijri?.month.en);
      setYear(result?.data?.data.date?.hijri?.year);
      setEnglishDate(
        ` ${result?.data?.data.date.gregorian.day} ${result?.data?.data.date.gregorian.month.en} ${result?.data?.data.date.gregorian.year}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // getLocation();
    getGeoLocation();
  }, [time, type, methodType, adjustment]);

  return (
    <div>
      <div id="prayers" className="prayers">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} textAlign={"center"}>
            <Clock
              day={data?.date?.gregorian?.weekday?.en}
              location={`${address}`}
              enDate={englishDate}
              isDate={`${day} ${month} ${year}`}
            />
          </Grid>
          <Grid item xs={12} sm={8} textAlign={"center"}>
            <Typography
              variant="h5"
              component="h2"
              style={{ fontWeight: "700", fontSize: "1.7rem" }}
            >
              World Azaan App give you daily prayer time as well as past and
              future time.
            </Typography>
            <Typography
              variant="h5"
              component="h2"
              style={{ fontSize: "1.19rem" }}
            >
              The Salat is the time when the meeting with Allah and the
              ascension (Me'raj) of the believer takes place. We all know the
              importance of this obligatory act, and thus, we do not wish to
              delve into that area. Rather, we want to look at the greatness and
              rewards of performing the Salat in its ' appointed time' - meaning
              right when the prime time for it sets in.
            </Typography>
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
                  location={location}
                  set={setType}
                  type={type}
                  setMethodType={setMethodType}
                  setAdjustment={setAdjustment}
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
                  display: data && "flex",
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
              {getFivePrayers(filterDay?.timings).map(({ prayer, time }, i) => (
                <Button
                  style={{
                    backgroundColor: "#fff",
                    color: "black",
                    border:
                      getPrayerTime1(getFivePrayers(data?.timings)) ===
                        prayer && "4px solid black",
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
                  <div>{time.split(" ")[0]}</div>
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
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Wave
        fill="#3ba59a"
        paused={false}
        options={{
          height: 20,
          amplitude: 45,
          speed: 0.1,
          points: 5,
        }}
      />
    </div>
  );
};

export default Prayers;
