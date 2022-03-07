import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleSurah } from "../services/api";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@mui/material";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Wave from "react-wavify";

const Juz = () => {
  const { id } = useParams();
  const [surahData, setSurahData] = useState();
  const [translationType, setTranslationType] = useState(true);
  const getSurah = async () => {
    setSurahData();
    try {
      let { data } = await getSingleSurah(
        id.split(",")[0],
        translationType ? "urdu_junagarhi" : "english_saheeh"
      );
      setSurahData(data.result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSurah();
  }, [translationType]);

  return (
    <div className="surah">
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
        <h1>{id.split(",")[1]}</h1>
        <h1>({id.split(",")[2]})</h1>
        <h1>{id.split(",")[3]}</h1>
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
        <FlipCameraAndroidIcon style={{ marginLeft: "1rem" }} />
      </Button>
      <div className="ayahs">
        {id.split(",")[0] !== "9" &&
          id.split(",")[1] !== "1" &&
          id.split(",")[0] !== "1" && (
            <p id="bold">بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ</p>
          )}
        {!surahData && (
          <div style={{ marginTop: "10rem" }}>
            <CircularProgress color="success" />
          </div>
        )}
        {surahData &&
          surahData?.map(
            ({ arabic_text, aya, translation, footnotes }, index) => (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <p className="arabic" id="bold">
                      {arabic_text}({aya})
                    </p>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <p
                    className={translationType ? "urdu" : "english"}
                    id="halfbold"
                  >
                    {translation}
                  </p>
                  <p className={translationType ? "urdu" : "english"}>
                    {footnotes}
                  </p>
                </AccordionDetails>
              </Accordion>
            )
          )}
      </div>
    </div>
  );
};

export default Juz;
