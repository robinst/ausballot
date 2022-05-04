import { FunctionalComponent, h } from "preact";
import style from "./style.css";
import houseCandidates from "../../../data/house-candidates.json";
import { stateNames } from "../constants";

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
    <div class={style.candidateDiv}>
      <div class={style.order} />
      <div class={style.candidateDetails}>
        <p class={style.candidateName}>
          {candidate.surname}, {candidate.ballotGivenName}
        </p>
        <p class={style.candidateParty}>{candidate.partyBallotName}</p>
      </div>
    </div>
  );
};

const HouseBallot: FunctionalComponent<Props> = (props: Props) => {
  const { state, division } = props;

  const candidates = (houseCandidates as any)[state][
    division
  ] as HouseCandidate[];

  const stateName = stateNames[state] || state;

  return (
    <div class={style.ballot}>
      <p class={style.state}>{stateName}</p>
      <p class={style.division}>Electoral Division of {division}</p>
      <p class={style.how}>
        Number the boxes from 1 to {candidates.length} in the order of your
        choice.
      </p>

      {candidates.map((c, i) => renderCandidate(c))}
    </div>
  );
};

export default HouseBallot;
