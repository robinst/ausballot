import { FunctionalComponent, h } from "preact";
import style from "./style.css";

const About: FunctionalComponent = () => {
  return (
    <div class={style.about}>
      <h2>About</h2>
      <p>TODO Disclaimer</p>
      <p>
        Your vote data is not sent anywhere, it is only stored on your device
        within your browser using{" "}
        <a
          href="https://en.wikipedia.org/wiki/Web_storage"
          target="_blank"
          rel="noreferrer"
        >
          local storage
        </a>
        .
      </p>
      <p>Like this site? How about:</p>
      <a href="https://www.buymeacoffee.com/robinst">
        <img width="200" height="56" src="/assets/bmc-button.png" />
      </a>
    </div>
  );
};

export default About;
