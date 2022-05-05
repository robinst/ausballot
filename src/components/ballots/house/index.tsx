import { createRef, FunctionalComponent, h } from "preact";
import style from "./style.css";
import houseCandidates from "../../../data/house-candidates.json";
import { stateNames } from "../constants";
import {
  StateUpdater,
  useEffect,
  useLayoutEffect,
  useState,
} from "preact/hooks";

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

const updateRanking = (
  index: number,
  ranking: number[],
  setRanking: StateUpdater<number[]>
) => {
  ranking = [...ranking];
  if (ranking[index] !== undefined) {
    delete ranking[index];
    setRanking(ranking);
  } else {
    const availableNumbers = Array.from({ length: 10 }, (x, i) => i + 1);
    for (const rank of ranking) {
      delete availableNumbers[rank - 1];
    }
    const rank = availableNumbers.find((n) => n);
    if (rank !== undefined) {
      ranking[index] = rank;
      setRanking(ranking);
    }
  }
};

const renderCandidate = (
  candidate: HouseCandidate,
  index: number,
  ranking: number[],
  setRanking: StateUpdater<number[]>
) => {
  const onClick = () => {
    updateRanking(index, ranking, setRanking);
  };

  return (
    <div class={style.candidateDiv}>
      <div class={style.order} onClick={onClick}>
        {ranking[index]}
      </div>
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

  const ref = createRef();

  const [ranking, setRanking] = useState<number[]>(Array(candidates.length));

  useLayoutEffect(() => {
    const node = ref.current;
    if (node !== undefined) {
      // node.style.width = `${node.clientHeight * 3}px`;
    }
  });

  const stateName = stateNames[state] || state;

  return (
    <div>
      <div class={style.ballotContainer} ref={ref}>
        <div class={style.ballot}>
          <p class={style.state}>{stateName}</p>
          <p class={style.division}>Electoral Division of {division}</p>
          <p class={style.how}>
            Number the boxes from 1 to {candidates.length} in the order of your
            choice.
          </p>

          {candidates.map((c, i) => renderCandidate(c, i, ranking, setRanking))}
        </div>
      </div>
      <div className={style.stretcher} />
    </div>
  );
};

export default HouseBallot;
