import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleSurah, getAudio } from "../services/api";
import { mergeList } from "../functions/listMerge";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@mui/material";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Wave from "react-wavify";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import IconButton from "@mui/material/IconButton";

const Juz = () => {
  const { id } = useParams();
  const [surahData, setSurahData] = useState();
  const [translationType, setTranslationType] = useState(true);
  const getSurah = async () => {
    setSurahData();
    try {
      let [{ data }, audio] = await Promise.all([
        getSingleSurah(
          id.split(",")[0],
          translationType ? "urdu_junagarhi" : "english_saheeh"
        ),
        getAudio(id.split(",")[0]),
      ]);
      let { ayahs } = audio.data.data;
      setSurahData(mergeList(ayahs, data.result));
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
        {surahData && (
          <MultiPlayer audio={surahData} translationType={translationType} />
        )}
      </div>
    </div>
  );
};

export default Juz;

const MultiPlayer = ({ audio, translationType }) => {
  const [players, toggle] = useMultiAudio(audio);

  const Player = ({ player, toggle }) => {
    let { arabic_text, aya, translation, footnotes } = player;
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          margin: "1rem ",
        }}
      >
        <IconButton onClick={toggle}>
          {player.playing ? <PauseCircleIcon /> : <PlayCircleIcon />}
        </IconButton>
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
            <p className={translationType ? "urdu" : "english"} id="halfbold">
              {translation}
            </p>
            <p className={translationType ? "urdu" : "english"}>{footnotes}</p>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  };

  return (
    <div>
      {players.map((player, i) => (
        <Player key={i} player={player} toggle={toggle(i)} />
      ))}
    </div>
  );
};

const useMultiAudio = (array) => {
  const [sources] = useState(
    array.map((url) => {
      let { arabic_text, aya, translation, footnotes } = url;
      return {
        arabic_text,
        aya,
        translation,
        footnotes,
        audio: new Audio(url.audio),
      };
    })
  );

  const [players, setPlayers] = useState(
    array.map((url) => {
      let { arabic_text, aya, translation, footnotes } = url;
      return {
        arabic_text,
        aya,
        translation,
        footnotes,
        audio: new Audio(url.audio),
      };
    })
  );

  const toggle = (targetIndex) => () => {
    const newPlayers = [...players];
    const currentIndex = players.findIndex((p) => p.playing === true);
    if (currentIndex !== -1 && currentIndex !== targetIndex) {
      newPlayers[currentIndex].playing = false;
      newPlayers[targetIndex].playing = true;
    } else if (currentIndex !== -1) {
      newPlayers[targetIndex].playing = false;
    } else {
      newPlayers[targetIndex].playing = true;
    }
    setPlayers(newPlayers);
  };

  useEffect(() => {
    sources.forEach((source, i) => {
      players[i].playing ? source.audio.play() : source.audio.pause();
    });
  }, [sources, players]);

  useEffect(() => {
    sources.forEach((source, i) => {
      source.audio.addEventListener("ended", () => {
        const newPlayers = [...players];
        newPlayers[i].playing = false;
        setPlayers(newPlayers);
      });
    });
    return () => {
      sources.forEach((source, i) => {
        source.audio.removeEventListener("ended", () => {
          const newPlayers = [...players];
          newPlayers[i].playing = false;
          setPlayers(newPlayers);
        });
      });
    };
  }, []);

  return [players, toggle];
};
