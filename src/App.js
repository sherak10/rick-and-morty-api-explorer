import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "components/pages/Home";
import CharacterList from "components/pages/character/CharacterList";
import EpisodeList from "components/pages/episode/EpisodeList";
import LocationList from "components/pages/location/LocationList";
import CharacterDetails from "components/pages/character/CharacterDetails";
import EpisodeDetails from "components/pages/episode/EpisodeDetails";
import LocationDetails from "components/pages/location/LocationDetails";
import "./App.css";
import NavBar from "components/pages/NavBar";

function App() {
  return (
    <Router>
      <div className="mt-2 mr-5 mb-3 ml-5">
        <NavBar />

        <Switch>
          <Route path="/characters/:id">
            <CharacterDetails />
          </Route>

          <Route path="/characters">
            <CharacterList />
          </Route>

          <Route path="/episodes/:id">
            <EpisodeDetails />
          </Route>

          <Route path="/episodes">
            <EpisodeList />
          </Route>

          <Route path="/locations/:id">
            <LocationDetails />
          </Route>

          <Route path="/locations">
            <LocationList />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
