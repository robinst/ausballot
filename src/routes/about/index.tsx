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
        Last time I went to the polling place, I remember being overwhelmed by
        the ballot papers (especially the senate) and not feeling prepared
        enough.
      </p>
      <p>
        I wanted a way to see what my ballot papers are going to look like and
        decide how to vote beforehand. The AEC website has a list of all the
        candidates, but it's very long and hard to read.
      </p>
      <p>
        I saw that the AEC provides CSV files with the candidate data, so I
        downloaded it and after a bit of coding ended up with this :).
      </p>
      <p>
        Hopefully by sharing this it can help others prepare for their vote as
        well!
      </p>
      <h4>Is this official?</h4>
      <p>
        No, it's not an official website, I just built this for fun and thought
        it might be helpful for people. Use at your own discretion.
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
      <h4>Is the vote data saved/sent anywhere?</h4>
      <p>
        No, your vote data is only stored in your browser on your device using{" "}
        <a
          href="https://en.wikipedia.org/wiki/Web_storage"
          target="_blank"
          rel="noreferrer"
        >
          local storage
        </a>{" "}
        for the purpose of not losing your selection if you accidentally
        navigate away or switch electorate. You can delete the data by clearing
        website data in your browser.
      </p>
      <h4>Anything else?</h4>
      <p>
        If you like this site and would like to show your support, buy me a
        coffee here 😄:
      </p>
      <a href="https://www.buymeacoffee.com/robinst">
        <img width="200" height="56" src="/assets/bmc-button.png" />
      </a>
    </div>
  );
};

export default About;
