import { useState } from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "../assets/logo";
import Button from "@mui/material/Button";
import surahs from "../data/surahs.json";
import { useNavigate } from "react-router-dom";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import Wave from "react-wavify";
import JuzButton from "./JuzButton";
import { data } from "../data/juzAllData";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: "0rem 1rem",
  textAlign: "center",
  color: theme.palette.text.secondary,
  marginTop: "0.5rem",
  borderRadius: "30px 30px ",
  width: "70%",
  maxWidth: "30rem",
  display: "flex",
  alignItems: "center",
}));

const Alquran = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [toggled, setToggled] = useState(false);

  const filterData = surahs?.data.filter(
    (surah) =>
      surah.name.toLowerCase().includes(value) ||
      surah.englishName.toLowerCase().includes(value) ||
      surah.number.toString().includes(value) ||
      surah.englishNameTranslation.toLowerCase().includes(value) ||
      surah.revelationType.toLowerCase().includes(value)
  );

  return (
    <div id="al-Quran" className="al-quran">
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
      <div className="search">
        <Logo width="6rem" />
        <Item>
          <input
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search Surah"
          />
          <SearchIcon />
        </Item>
      </div>
      <Button
        variant="contained"
        style={{
          width: "fit-content",
          alignSelf: "center",
          marginTop: "1rem ",
          backgroundColor: "#22c1c3",
        }}
        onClick={() => setToggled(!toggled)}
      >
        {toggled ? "JUZ" : "SURAH"}
        <FlipCameraAndroidIcon style={{ marginLeft: "1rem" }} />
      </Button>
      <div container className="al-quran-surahs" spacing={3}>
        {!toggled ? (
          filterData.map(
            (
              {
                englishName,
                number,
                englishNameTranslation,
                name,
                numberOfAyahs,
              },
              i
            ) => (
              <Button
                className="button"
                onClick={() =>
                  navigate(
                    `/al-Quran/${
                      number +
                      "," +
                      englishName +
                      "," +
                      englishNameTranslation +
                      "," +
                      name
                    }`
                  )
                }
                variant="contained"
              >
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                  }}
                >
                  <div id="number">{number}</div>
                  <div className="surah-name">
                    <h4>{englishName}</h4>
                    <p>{englishNameTranslation}</p>
                  </div>
                </div>
                <div className="arabic-name">
                  <h4 id="arabic">{name}</h4>
                  <p>{numberOfAyahs} Ayahs</p>
                </div>
              </Button>
            )
          )
        ) : (
          <div
            className="al-quran-surahs"
            columns={{ xs: 1, sm: 3 }}
            spacing={3}
          >
            {data.map((item, index) => (
              <JuzButton item={item} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Alquran;
