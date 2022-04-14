import { calenderTime } from "../functions/time";
import jsPDF from "jspdf";
import "jspdf-autotable";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { Button } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { methods, AdjustmentMethod } from "../data/rawData";
import { useSelector } from "react-redux";
const style = {
  color: "#22c1c3",
  "&.Mui-checked": {
    color: "#22c1c3",
  },
};

const Calender = ({ location, set, type, setMethodType, setAdjustment }) => {
  const { calenderData } = useSelector((state) => state);
  
  const data = calenderData?.map(({ date, timings }) => [
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
    const title = `Prayer time of ${calenderData[0]?.date?.gregorian.month.en} ${calenderData[0]?.date?.gregorian.year} of ${location?.city} ${location?.country} By Azaan App.`;
    let content = {
      startY: 50,
      head: [columns],
      body: data,
    };
    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    let finalY = doc.lastAutoTable.finalY + 40; // The y position on the page
    console.log(finalY);
    doc.text(250, finalY, "AZAAN APP");
    doc.save(
      `${calenderData[0]?.date?.gregorian.month.en}${location?.city}.pdf`
    );
  };

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
        <RadioGroup
          style={{
            width: "15rem",
            display: "flex",
            justifyContent: "space-between",
          }}
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          onChange={(e) => set(e.target.value)}
          value={type}
        >
          <FormControlLabel
            value={0}
            control={<Radio sx={style} />}
            label="SHAFI"
          />
          <FormControlLabel
            value={1}
            control={<Radio sx={style} />}
            label="HANFI"
          />
        </RadioGroup>
      </div>
      <div className="inputs">
        <div>
          <label>Algorithm:</label>
          <select
            className="select"
            onChange={(e) => setMethodType(e.target.value)}
          >
            {methods.map(({ id, name }, index) => (
              <option key={index} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Adjustment:</label>
          <select
            className="select"
            onChange={(e) => setAdjustment(e.target.value)}
          >
            {AdjustmentMethod.map(({ id, name }, index) => (
              <option key={index} value={id}>
                {name}
              </option>
            ))}
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
          style={{ background: i % 2 === 0 ? "#F4F4F4" : "#fff" }}
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
