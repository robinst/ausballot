import { FunctionalComponent, h } from "preact";
import style from "./style.css";
import houseCandidates from "../../data/house-candidates.json";
import Select, { components, SingleValueProps } from "react-select";

type Option = {
  label: string;
  value: string;
  state: string;
};

const SingleValue = ({ ...props }: SingleValueProps<Option>) => (
  <components.SingleValue {...props}>
    {props.data.label} ({props.data.state})
  </components.SingleValue>
);

const groupedOptions = () => {
  const groupedOptions = [];

  for (const [state, divisions] of Object.entries(houseCandidates)) {
    const options: Option[] = [];
    for (const division of Object.keys(divisions)) {
      options.push({
        label: `${division}`,
        value: `${state}/${division}`,
        state,
      });
    }
    options.sort((a, b) => a.label.localeCompare(b.label));

    groupedOptions.push({
      label: state,
      options,
    });
  }
  groupedOptions.sort((a, b) => a.label.localeCompare(b.label));
  return groupedOptions;
};

const Home: FunctionalComponent = () => {
  const options = groupedOptions();

  return (
    <div class={style.home}>
      <h1>Home</h1>
      <Select options={options} components={{ SingleValue }} />
      <p>This is the Home component.</p>
    </div>
  );
};

export default Home;
