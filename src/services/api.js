import axios from "axios";

// type= translation ? "urdu_junagarhi" : "english_saheeh" , number= 1 to 114
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
      "x-rapidapi-host": "telize-v1.p.rapidapi.com",
      "x-rapidapi-key": "349f7652acmsh712b12fce0616b6p1051b8jsne004d5039bd4",
    },
  });
}
// time uix
export function getPrayerTimeApi(time, latitude, longitude) {
  if (latitude || longitude) {
    return axios({
      method: "GET",
      url: `https://api.aladhan.com/v1/timings/${time}?latitude=${latitude}&longitude=${longitude}&method=1`,
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
  }
}

export const getCalender = async (country, month, year, type) => {
  return axios({
    method: "GET",
    url: `https://api.aladhan.com/v1/calendarByAddress?address=${country}&method=2&month=${month}&year=${year}&school=${type}`,
    headers: {
      "Content-type": "application/json",
    },
  });
};
