import { FunctionalComponent, h } from "preact";
import { Route, Router } from "preact-router";

import About from "../routes/about";
import Electorate from "../routes/electorate";
import Home from "../routes/home";
import NotFoundPage from "../routes/notfound";
import Header from "./header";

const App: FunctionalComponent = () => {
  return (
    <div id="preact_root">
      <Header />
      <Router>
        <Route path="/" component={Home} />
        <Route path="/about/" component={About} />
        <Route path="/electorate/:state/:division" component={Electorate} />
        <NotFoundPage default />
      </Router>
    </div>
  );
};

export default App;
