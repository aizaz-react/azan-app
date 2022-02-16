import { format, parse } from "date-fns";
import _ from "lodash";

export const getTime = (time) => {
  return format(parse(time, "HH:mm", new Date()), "hh:mm a");
};

export const getFivePrayers = (data) => {
  let prayers = _.pick(data, ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"]);
  let prayerList = [];
  for (let [prayer, time] of Object.entries(prayers)) {
    prayerList.push({ prayer, time });
  }
  return prayerList;
};
