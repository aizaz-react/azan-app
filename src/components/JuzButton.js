import React from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { juzFilterAction } from "../redux/reducers";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  borderRadius: "1rem 1rem ",
  height: "fit-content",
}));

const JuzButton = ({ item, index }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (item) => {
    dispatch(juzFilterAction(item));
    navigate(`/al-Quran/juz/${index}`);
  };
  return (
    <Item>
      <div className="juz-button">
        <h3>Juz {index + 1}</h3>
        {item.map((item, index) => {
          let { englishName, number, englishNameTranslation, name, from, to } =
            item;
          return (
            <button
              key={index}
              onClick={() => handleClick(item)}
              className="button1"
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
                <p>
                  {from}-{to} Ayahs
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </Item>
  );
};

export default JuzButton;
