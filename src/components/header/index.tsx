import { FunctionalComponent, h } from "preact";
import { Link } from "preact-router/match";
import style from "./style.css";

const Header: FunctionalComponent = () => {
  return (
    <header class={`header ${style.header}`}>
      <h1>AusBallot</h1>
      <nav>
        <Link
          activeClassName={style.active}
          href="/"
          onClick={() => localStorage.removeItem("electorate")}
        >
          Home
        </Link>
        <Link activeClassName={style.active} href="/about">
          About
        </Link>
      </nav>
    </header>
  );
};

export default Header;
