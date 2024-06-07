import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./HomePage";
import LikedMovies from "./components/FavouritesPage";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            index
            element={
              <>
                <Homepage />
              </>
            }
          />
          <Route
            path="/components/FavouritesPage"
            element={
              <>
                <LikedMovies />
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
