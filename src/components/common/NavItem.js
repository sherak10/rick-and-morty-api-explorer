import { Link } from "react-router-dom";

export default function NavItem({ title, path }) {
  return (
    <li className="nav-item">
      <Link className="nav-link" to={path}>
        {title}
      </Link>
    </li>
  );
}
