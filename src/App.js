import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Prayers from "./components/Prayers";
import "./App.scss";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alquran from "./components/alquran";
import Surah from "./components/surah";
import Juz from "./components/juz";

const lightTheme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#3f51b1",
    },
    textPrimary: { main: "#3f51b1" },
  },
});

const darkTheme1 = createTheme({
  palette: {
    type: "dark",
    primary: { main: "#fff" },
    textPrimary: { main: "#fff" },
  },
});

function App() {
  const [darkTheme] = useState(true);

  return (
    <ThemeProvider theme={darkTheme ? lightTheme : darkTheme1}>
      <div className="App">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <Home />
                  <Prayers />
                </div>
              }
            />
            <Route exact path="/al-Quran" element={<Alquran />} />
            <Route exact path="/al-Quran/:id" element={<Surah />} />
            <Route exact path="/al-Quran/juz" element={<Juz />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
