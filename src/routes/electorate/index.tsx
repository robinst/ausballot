import { FunctionalComponent, h } from "preact";
import style from "./style.css";
import SelectElectorate from "../../components/select-electorate";
import HouseBallot from "../../components/ballots/house";
import SenateBallot from "../../components/ballots/senate";

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

      <SenateBallot state={state} />

      <div class={style.stretcher} />
    </div>
  );
};

export default Electorate;
