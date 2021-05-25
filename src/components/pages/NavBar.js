import { Link } from "react-router-dom";
import NavItem from "components/common/NavItem";
import { strings } from "res/strings";

export default function NavBar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand mb-0 h1" to="/">
          {strings.app.name}
        </Link>

        <ul className="navbar-nav mr-auto">
          <NavItem title={strings.models.characters.title} path="/characters" />
          <NavItem title={strings.models.episodes.title} path="/episodes" />
          <NavItem title={strings.models.locations.title} path="/locations" />
        </ul>
      </nav>
    </>
  );
}
