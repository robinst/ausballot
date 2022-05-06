import { FunctionalComponent, h } from "preact";
import style from "./style.css";
import SelectElectorate from "../../components/select-electorate";

const Home: FunctionalComponent = () => {
  return (
    <div class={style.home}>
      <div>
        <h2>Welcome</h2>
        <p>
          Are you voting in the 2022 Australian election? Would you like to see
          your ballot papers before going to the polls? You've come to the right
          place.
        </p>
        <p>Select your electorate below to get started:</p>
      </div>
      <SelectElectorate />
      <p className={style.info}>
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
