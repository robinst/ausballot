import { FunctionalComponent, h } from "preact";
import style from "./style.css";

const About: FunctionalComponent = () => {
  return (
    <div class={style.about}>
      <h1>About</h1>
      <p>Like this site? How about:</p>
      <a href="https://www.buymeacoffee.com/robinst">
        <img width="200" height="56" src="/assets/bmc-button.png" />
      </a>
    </div>
  );
};

export default About;
