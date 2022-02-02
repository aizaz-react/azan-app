import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getSingleSurah } from "../services/api";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@mui/material";

const Juz = () => {
    const { id } = useParams();
  //   const [surahData, setSurahData] = useState();
  const [translationType, setTranslationType] = useState(true);
  //   const getSurah = async () => {
  //     setSurahData();
  //     try {
  //       let { data } = await getSingleSurah(
  //         id.split(",")[0],
  //         translationType ? "urdu_junagarhi" : "english_saheeh"
  //       );
  //       setSurahData(data.result);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   useEffect(() => {
  //     getSurah();
  //   }, [translationType]);

  return (
    <div className="surah">
      <div className="headings">
        <h1>Chapter {id}</h1>
      </div>
      <Button
        variant="contained"
        style={{
          width: "fit-content",
          alignSelf: "center",
          marginTop: "1rem ",
          backgroundColor: "#22c1c3",
        }}
        onClick={() => setTranslationType(!translationType)}
      >
        {translationType ? "English" : "Urdu"}
      </Button>
      <div className="ayahs">
        <p id="bold">بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ</p>
        {/* {!surahData && (
          <div style={{ marginTop: "10rem" }}>
            <CircularProgress color="success" />
          </div>
        )} */}
        {/* {surahData &&
          surahData?.map(
            ({ arabic_text, aya, translation, footnotes }, index) => (
              <div className="single-ayah">
                <p className="arabic" id="bold">
                  {arabic_text}({aya})
                </p>
                <p
                  className={translationType ? "arabic" : "english"}
                  id="halfbold"
                >
                  {translation}
                </p>
                <p className={translationType ? "arabic" : "english"}>
                  {footnotes}
                </p>
              </div>
            )
          )} */}
      </div>
    </div>
  );
};

export default Juz;
