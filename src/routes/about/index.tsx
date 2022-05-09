import { FunctionalComponent, h } from "preact";
import style from "./style.css";

const About: FunctionalComponent = () => {
  return (
    <div class={style.about}>
      <h4>Who built this?</h4>
      <p>
        Hey, my name is Robin and I'm a software developer from Sydney. You can
        find me on <a href="https://twitter.com/niborst">Twitter</a>!
      </p>
      <h4>Why did you build this?</h4>
      <p>
        I was researching who to vote for and all I could find on the AEC
        website was a very long and hard to read page with all the candidates.
      </p>
      <p>
        It didn't make me feel prepared enough to go to a polling place and to
        be able to number the boxes without knowing more about the parties,
        especially for the senate ballot.
      </p>
      <p>
        I saw that the AEC provided a data download and then after a bit of
        coding ended up with this :).
      </p>
      <h4>Is this official?</h4>
      <p>
        In case it wasn't clear yet, it's in no way official, I just built this
        for fun and thought it might be helpful for people. Use at your own
        risk, etc.
      </p>
      <h4>How did you build it?</h4>
      <ul>
        <li>
          Data from the{" "}
          <a href="https://www.aec.gov.au/election/downloads.htm">
            AEC downloads page
          </a>
        </li>
        <li>
          Code is open source and you can find it{" "}
          <a href="https://github.com/robinst/ausballot/">on GitHub</a> (built
          in TypeScript & Preact)
        </li>
      </ul>
      <h4>Is the vote data sent/stored somewhere?</h4>
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
      <h4>Anything else?</h4>
      <p>Like this site? Feel free to buy me a coffee here:</p>
      <a href="https://www.buymeacoffee.com/robinst">
        <img width="200" height="56" src="/assets/bmc-button.png" />
      </a>
    </div>
  );
};

export default About;
