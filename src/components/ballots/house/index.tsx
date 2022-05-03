import { FunctionalComponent, h } from "preact";
import style from "./style.css";
import houseCandidates from "../../../data/house-candidates.json";

interface Props {
  state: string;
  division: string;
}

type HouseCandidate = {
  ballotPosition: number;
  surname: string;
  ballotGivenName: string;
  partyBallotName: string;
};

const renderCandidate = (candidate: HouseCandidate) => {
  return (
    <div>
      <p class={style.candidateName}>
        {candidate.surname}, {candidate.ballotGivenName}
      </p>
      <p class={style.candidateParty}>{candidate.partyBallotName}</p>
    </div>
  );
};

const HouseBallot: FunctionalComponent<Props> = (props: Props) => {
  const { state, division } = props;

  const candidates = (houseCandidates as any)[state][
    division
  ] as HouseCandidate[];

  return (
    <div class={style.ballot}>
      <p>{state}</p>
      <p>Electoral Division of {division}</p>
      <hr />
      <p>Number the boxes from 1 to 8 in the order of your choice.</p>
      {candidates.map((c) => renderCandidate(c))}
    </div>
  );
};

export default HouseBallot;
