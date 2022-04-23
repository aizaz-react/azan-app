import axios from "axios";

// export function getJuz(number) {
//   return axios({
//     method: "GET",
//     url: "http://api.alquran.cloud/v1/juz/30/quran-uthmani",
//     headers: {
//       "Content-type": "multipart/form-data",
//     },
//   });
// }

export function getSingleSurah(number, type) {
  return axios({
    method: "GET",
    url: `https://quranenc.com/api/v1/translation/sura/${type}/${number}`,
    headers: {
      "Content-type": "multipart/form-data",
    },
  });
}

// export const getAudio = (number, translation) => {
//   return axios({
//     method: "GET",
//     url: `https://server6.mp3quran.net/translation/ur_abdulbasit_abdulsamad/${modnum(number)}.mp3`,
//     headers: {
//       "Content-type": "multipart/form-data",
//     },
//   });
// };

// function modnum(number) {
//   let n = `${number}`
//   if (n.length === 1) return `00${n}`
//   if (n.length === 2) return `0${n}`
//   return n
// }

// export const getAudio = (number) => {
//   return axios({
//     method: "GET",
//     url: `https://api.alquran.cloud/v1/surah/${number}/ar.alafasy`,
//     headers: {
//       "Content-type": "multipart/form-data",
//     },
//   });
// };

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
