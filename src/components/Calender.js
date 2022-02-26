import { useEffect, useState } from "react";
import { getCalender } from "../services/api";
import { calenderTime } from "../functions/time";
import jsPDF from "jspdf";
import "jspdf-autotable";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { Button } from "@mui/material";
import { countryNames, months, years } from "../data/rawData";
import moment from "moment";

const Calender = ({ location }) => {
  const [state, setState] = useState([]);
  const [country, setCountry] = useState(`${location}`);
  const [year, setYear] = useState(parseInt(moment().format("YYYY")));
  const [month, setMonth] = useState(parseInt(moment().format("M")));
  const [type, setType] = useState(0);
  useEffect(() => {
    setCountry(location);
  }, [location]);
  const getPrayerData = async () => {
    try {
      let { data } = await getCalender(country, month, year, type);
      setState(data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const data = state?.map(({ date, timings }) => [
    date.readable,
    calenderTime(timings.Fajr),
    calenderTime(timings.Dhuhr),
    calenderTime(timings.Asr),
    calenderTime(timings.Maghrib),
    calenderTime(timings.Isha),
  ]);
  const columns = ["Date", "Fajr", "Dhuhr", "Asr", "Magrib", "Isha"];
  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    const title = `Prayer time of ${state[0]?.date?.gregorian.month.en} ${state[0]?.date?.gregorian.year} of ${country}`;
    let content = {
      startY: 50,
      head: [columns],
      body: data,
    };
    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save(`${state[0]?.date?.gregorian.month.en}${country}.pdf`);
  };

  useEffect(() => {
    getPrayerData();
  }, [country, month, year, type]);
  return (
    <div className="prayer-calender">
      <div
        style={{
          display: "flex",
          gap: "1rem",
          margin: "0.5rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <div id="borders" className="inputs">
          <select
            className="drop-down"
            name="category"
            onChange={(e) => setMonth(e.target.value)}
          >
            {months.map((value) => {
              return (
                <option value={value.number} selected={value.number === month}>
                  {value.name}
                </option>
              );
            })}
          </select>
        </div>
        <div id="borders" className="inputs">
          <select
            className="drop-down"
            name="category"
            onChange={(e) => setYear(e.target.value)}
          >
            {years.map((value) => {
              return (
                <option value={value} selected={value === year}>
                  {value}
                </option>
              );
            })}
          </select>
        </div>
        <div id="borders" className="inputs">
          <select
            className="drop-down"
            name="category"
            onChange={(e) => setCountry(e.target.value)}
          >
            {countryNames.map((value) => {
              return (
                <option value={value.name} selected={value.name === country}>
                  {value.name}
                </option>
              );
            })}
          </select>
        </div>
        <div id="borders" className="inputs">
          <select
            className="drop-down"
            name="category"
            onChange={(e) => setType(e.target.value)}
          >
            <option value={0} selected={type}>
              Shafi
            </option>
            <option value={1}>Hanfi</option>
          </select>
        </div>
      </div>
      <div className="table-header">
        {columns.map((column, i) => (
          <div key={i}>
            <h3>{column}</h3>
          </div>
        ))}
      </div>
      {data?.map((item, i) => (
        <div
          key={i}
          className="table-row"
          style={{ background: i % 2 == 0 ? "#F4F4F4" : "#fff" }}
        >
          {item.map((item) => (
            <div>{item}</div>
          ))}
        </div>
      ))}
      <Button
        variant="contained"
        style={{ background: "#3ba59a", margin: "1rem" }}
        onClick={exportPDF}
      >
        <PictureAsPdfIcon />
        Download
      </Button>
    </div>
  );
};

export default Calender;
