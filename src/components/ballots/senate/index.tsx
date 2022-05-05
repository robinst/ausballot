import { FunctionalComponent, h } from "preact";
import style from "./style.css";
import commonStyle from "../style.css";
import senateCandidates from "../../../data/senate-candidates.json";
import { stateNames } from "../constants";
import { StateUpdater, useState } from "preact/hooks";

interface Props {
  state: string;
}

type SenateGroup = {
  column: string;
  groupName: string;
  candidates: SenateCandidate[];
};

type SenateCandidate = {
  surname: string;
  ballotGivenName: string;
  partyBallotName: string;
};

const renderGroup = (group: SenateGroup) => {
  let groupDescription = group.groupName;
  if (groupDescription === null || groupDescription === "") {
    const names = group.candidates.map((c) => c.surname).join(",");
    groupDescription = `(${names})`;
  }
  return (
    <div class={style.groupDiv}>
      <div class={style.column}>{group.column}</div>
      <div class={commonStyle.rankingBox} />
      <div class={style.groupName}>{groupDescription}</div>
    </div>
  );
};

const SenateBallot: FunctionalComponent<Props> = (props: Props) => {
  const { state } = props;

  const groups = (senateCandidates as any)[state] as SenateGroup[];

  const stateName = stateNames[state] || state;

  return (
    <div class={style.ballot}>
      <p class={style.state}>{stateName}</p>

      <div class={style.groups}>{groups.map((g) => renderGroup(g))}</div>
    </div>
  );
};

export default SenateBallot;
