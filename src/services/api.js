import axios from "axios";

export function getSingleSurah(number, type) {
  return axios({
    method: "GET",
    url: `https://quranenc.com/api/v1/translation/sura/${type}/${number}`,
    headers: {
      "Content-type": "multipart/form-data",
    },
  });
}

export const getAudio = (number) => {
  return axios({
    method: "GET",
    url: `https://api.alquran.cloud/v1/surah/${number}/ar.alafasy`,
    headers: {
      "Content-type": "multipart/form-data",
    },
  });
};

export async function getUserLocation() {
  return await axios({
    method: "get",
    url: "https://telize-v1.p.rapidapi.com/geoip",
    headers: {
      "x-rapidapi-host": "telize-v1.p.rapidapi.com",
      "x-rapidapi-key": "349f7652acmsh712b12fce0616b6p1051b8jsne004d5039bd4",
    },
  });
}

export function getPrayerTimeApi(
  time,
  latitude,
  longitude,
  method,
  adjustment
) {
  if (latitude || longitude) {
    return axios({
      method: "GET",
      url: `https://api.aladhan.com/v1/timings/${time}?latitude=${latitude}&longitude=${longitude}&method=${method}&latitudeAdjustmentMethod=${adjustment}`,
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
