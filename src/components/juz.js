import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { getSingleSurah } from "../services/api";
import { juzAction } from "../redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SurahHeader from "./surahHeader";
import CircularProgress from "@mui/material/CircularProgress";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { data } from "../data/juzAllData";

const Juz = () => {
  const [translationType, setTranslationType] = useState(true);
  const { juzData, juzFilter } = useSelector((state) => state);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();
  let { number, from, to, juz } = juzFilter;
  const getJuzData = async () => {
    try {
      let { data } = await getSingleSurah(
        number,
        translationType ? "urdu_junagarhi" : "english_saheeh"
      );
      dispatch(juzAction(data.result.slice(from, to)));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const mergeJuz = () => {
    data[id].map(async (item, index) => {
      try {
        let { data } = await getSingleSurah(
          item.number,
          translationType ? "urdu_junagarhi" : "english_saheeh"
        );
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    });
  };
  useEffect(() => {
    getJuzData();
    setLoading(true);
    mergeJuz();
  }, [translationType]);

  return (
    <div className="surah">
      <SurahHeader juz={true} chapter={juz} />
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
      {loading ? (
        <div style={{ marginTop: "10rem" }}>
          <CircularProgress color="success" />
        </div>
      ) : (
        <div className="ayahs-juz">
          {juzData.map(
            ({ arabic_text, aya, translation, footnotes }, index) => (
              <Accordion style={{ flex: 1 }}>
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
      )}
    </div>
  );
};

export default Juz;
