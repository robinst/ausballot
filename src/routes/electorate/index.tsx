import { FunctionalComponent, h } from "preact";
import style from "./style.css";
import SelectElectorate from "../../components/select-electorate";
import HouseBallot from "../../components/ballots/house";

interface Props {
  state: string;
  division: string;
}

const Electorate: FunctionalComponent<Props> = (props: Props) => {
  const { state, division } = props;

  return (
    <div class={style.electorate}>
      <SelectElectorate selectedValue={`${state}/${division}`} />
      <h2>House ballot for {division}</h2>
      
      <HouseBallot state={state} division={division} />

      <h2>Senate ballot for {state}</h2>
      <p>TODO: Render ballots here</p>
    </div>
  );
};

export default Electorate;
