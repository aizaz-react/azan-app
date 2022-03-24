import React, { useEffect, useState } from "react";
import moment from "moment";

const Clock = ({ day, location, enDate, isDate }) => {
  const [time, setTime] = useState(moment().format("h:mm:ss a"));
  setInterval(() => {
    setTime(moment().format("h:mm:ss a"));
  }, 1000);

  return (
    <div className="clock">
      <h1>{time}</h1>
      <h2>{day}</h2>
      <h3>{location}</h3>
      <h4>
        {enDate} <span>{isDate}</span>
      </h4>
    </div>
  );
};

export default Clock;
