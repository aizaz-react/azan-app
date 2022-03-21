export const mergeList = (audio, text) => {
  let list = [];
  audio.map((item1, index) => {
    text.map((item, index1) => {
      if (index === index1) {
        list.push({ ...item, audio: item1.audio });
      }
    });
  });
  return list;
};
