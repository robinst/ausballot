import { FunctionalComponent, h } from "preact";
import style from "./style.css";
import SelectElectorate from "../../components/select-electorate";

interface Props {
  state: string;
  division: string;
}

const Electorate: FunctionalComponent<Props> = (props: Props) => {
  const { state, division } = props;

  return (
    <div class={style.electorate}>
      <SelectElectorate selectedValue={`${state}/${division}`} />
      <h1>
        {division} ({state})
      </h1>
      <p>TODO: Render ballots here</p>
    </div>
  );
};

export default Electorate;
