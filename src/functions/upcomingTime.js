import moment from "moment";

export const getPrayerTime1 = (time7) => {
  if (time7.length > 0) {
    function getPrayer(prayerName) {
      for (let i = 0; i < time7.length; i++) {
        if (prayerName == time7[i].prayer) {
          return time7[i];
        }
      }
    }

    var fajar = getPrayer("Fajr");
    var duhr = getPrayer("Dhuhr");
    var asr = getPrayer("Asr");
    var maghrib = getPrayer("Maghrib");
    var isha = getPrayer("Isha");

    var currentTime =  moment().format("HH:mm");
    var currentPrayer = null;
    if (currentTime >= fajar.time && currentTime < duhr.time) {
      currentPrayer = duhr;
    } else if (currentTime >= fajar.time && currentTime < asr.time) {
      currentPrayer = asr;
    } else if (currentTime >= duhr.time && currentTime < maghrib.time) {
      currentPrayer = maghrib;
    } else if (currentTime >= asr.time && currentTime < isha.time) {
      currentPrayer = isha;
    } else if (currentTime >= isha.time || currentTime < fajar.time) {
      currentPrayer = fajar;
    }
    return currentPrayer.prayer;
  }
};
// console.log(getTime(time))

//   console.log(`Current time is "${currentTime}" and Next Prayer is ${currentPrayer.prayer}`);
