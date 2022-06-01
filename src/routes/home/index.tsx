import { FunctionalComponent, h } from "preact";
import style from "./style.css";
import SelectElectorate from "../../components/select-electorate";
import { useEffect } from "preact/hooks";
import { route } from "preact-router";

const Home: FunctionalComponent = () => {
  useEffect(() => {
    const selectedElectorate = localStorage.getItem("electorate");
    if (selectedElectorate) {
      route(`/electorate/${selectedElectorate}`);
    }
  }, []);

  return (
    <div class={style.home}>
      <section class={style.main}>
        <h3>Hey! 👋</h3>
        <p>
          Are you voting in the 2022 Australian election? Would you like to see
          your ballot papers before going to the polls?
        </p>
        <p>Select your electorate to get started:</p>
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
      </section>
      <footer class={style.footer}>
        <a href="https://www.buymeacoffee.com/robinst">
          <img width="150" height="42" src="/assets/bmc-white-button.png" />
        </a>
      </footer>
    </div>
  );
};

export default Home;
