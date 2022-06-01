import { FunctionalComponent, h } from "preact";
import { route } from "preact-router";
import Select, { components, SingleValueProps } from "react-select";
import style from "./style.css";
import houseCandidates from "../../data/house-candidates.json";

interface Props {
  selectedValue?: string;
}

type Option = {
  label: string;
  value: string;
  state: string;
  division: string;
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
        division,
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

const onChange = (option: Option | null) => {
  if (option !== null) {
    localStorage.setItem("electorate", option.value);
    route(`/electorate/${option.value}`);
  } else {
    localStorage.removeItem("electorate");
    route("/");
  }
};

const SelectElectorate: FunctionalComponent<Props> = (props: Props) => {
  const options = groupedOptions();

  const { selectedValue } = props;
  const selectedOption = options
    .flatMap((o) => o.options)
    .find((o) => o.value === selectedValue);

  return (
    <div class={style.container}>
      <Select<Option, false>
        inputId="select-electorate"
        value={selectedOption}
        options={options}
        components={{ SingleValue }}
        isSearchable
        isClearable
        onChange={onChange}
        placeholder="Search..."
      />
    </div>
  );
};

export default SelectElectorate;
