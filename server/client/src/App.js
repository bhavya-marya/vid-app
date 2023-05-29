import styled, { ThemeProvider } from "styled-components"
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search";

const Container = styled.div`
  display:flex;
`;
const Main = styled.div`
  flex:7;
  background-color:${({ theme }) => theme.bg};
`;
const Wrapper = styled.div`
  padding:22px 45px;
`;

function App() {
  const [darkMode, setDarkMode] = useState("false");
  useEffect(() => {
    const currTheme = localStorage.getItem("darkMode");
    if (currTheme) {
      setDarkMode(currTheme)
    }
  }, [darkMode]);

  return (
    <ThemeProvider theme={darkMode === "true" ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="/trending" element={<Home type="trending" />} />
                  <Route path="/history" element={<Home type="history" />} />
                  <Route path="/saved" element={<Home type="saved" />} />
                  <Route path="/myvids" element={<Home type="myvids" />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/following" element={<Home type="fol" />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
