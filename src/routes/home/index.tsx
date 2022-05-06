import { FunctionalComponent, h } from "preact";
import style from "./style.css";
import SelectElectorate from "../../components/select-electorate";

const Home: FunctionalComponent = () => {
  return (
    <div class={style.home}>
      <SelectElectorate />
      <p>
        Not sure which electorate you're in? Find out on the{" "}
        <a
          href="https://electorate.aec.gov.au/"
          target="_blank"
          rel="noreferrer"
        >
          AEC website
        </a>
        .
      </p>
    </div>
  );
};

export default Home;
