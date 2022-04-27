import axios from "axios";
console.log(process.env.REACT_APP_GOOGLE_APIKEY);

export function getSingleSurah(number, type) {
  return axios({
    method: "GET",
    url: `https://quranenc.com/api/v1/translation/sura/${type}/${number}`,
    headers: {
      "Content-type": "multipart/form-data",
    },
  });
}

export async function getUserLocation() {
  return await axios({
    method: "get",
    url: "https://telize-v1.p.rapidapi.com/geoip",
    headers: {
      "x-rapidapi-host": process.env.REACT_APP_RAPID_HOSTNAME,
      "x-rapidapi-key": process.env.REACT_APP_RAPID_APIKEY,
    },
  });
}

export function getPrayerTimeApi(
  time,
  latitude,
  longitude,
  method,
  adjustment,
  type
) {
  if (latitude || longitude) {
    return axios({
      method: "GET",
      url: `https://api.aladhan.com/v1/timings/${time}?latitude=${latitude}&longitude=${longitude}&method=${method}&latitudeAdjustmentMethod=${adjustment}&school=${type}`,
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
  }
}

export const getCalender = async (
  country,
  month,
  year,
  type,
  method,
  adjustment
) => {
  return axios({
    method: "GET",
    url: `https://api.aladhan.com/v1/calendarByAddress?address=${country}&method=${method}&month=${month}&year=${year}&school=${type}&latitudeAdjustmentMethod=${adjustment}`,
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const getCityName = (latitude, longitude) => {
  return axios({
    method: "GET",
    url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true&key=AIzaSyAKB2FsqaJrptmP0dDSkzqL8DzVAX8PplU`,
  });
};
