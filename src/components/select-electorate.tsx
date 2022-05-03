import { FunctionalComponent, h } from "preact";
import { route } from "preact-router";
import Select, { components, ActionMeta, SingleValueProps } from "react-select";
import houseCandidates from "../data/house-candidates.json";

interface Props {
  defaultValue?: string;
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

const onChange = (option: Option | null, actionMeta: ActionMeta<Option>) => {
  if (option !== null) {
    route(`/electorate/${option.value}`);
  } else {
    route("/");
  }
};

const SelectElectorate: FunctionalComponent<Props> = (props: Props) => {
  const options = groupedOptions();

  const { defaultValue } = props;
  const defaultOption = options
    .flatMap((o) => o.options)
    .find((o) => o.value === defaultValue);

  return (
    <span>
      Electorate:
      <Select<Option, false>
        defaultValue={defaultOption}
        options={options}
        components={{ SingleValue }}
        isSearchable
        isClearable
        onChange={onChange}
      />
    </span>
  );
};

export default SelectElectorate;
