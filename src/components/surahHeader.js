import React from "react";
import Wave from "react-wavify";

const SurahHeader = ({
  englishName,
  enlishTranslation,
  arabicName,
  juz,
  chapter,
}) => {
  return (
    <div className="surah-header">
      <Wave
        className="wave1"
        fill="#3ba59a"
        paused={false}
        options={{
          height: 30,
          amplitude: 50,
          speed: 0.1,
          points: 5,
        }}
      />
      <div className="headings">
        {juz ? (
          <>
            <h1>Chapter {chapter}</h1>
          </>
        ) : (
          <>
            <h1>{englishName}</h1>
            <h1>({enlishTranslation})</h1>
            <h1>{arabicName}</h1>
          </>
        )}
      </div>
    </div>
  );
};

export default SurahHeader;
