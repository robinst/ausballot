import { FunctionalComponent, h } from "preact";
import style from "./style.css";
import commonStyle from "../style.css";
import houseCandidates from "../../../data/house-candidates.json";
import { StateUpdater, useState } from "preact/hooks";

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

enum RankingState {
  NotStarted,
  Incomplete,
  Complete,
}

const updateRanking = (
  index: number,
  ranking: Array<number | undefined>,
  setRanking: StateUpdater<Array<number | undefined>>
) => {
  ranking = [...ranking];
  if (ranking[index] !== undefined) {
    ranking[index] = undefined;
    setRanking(ranking);
  } else {
    const availableNumbers = Array.from({ length: 10 }, (x, i) => i + 1);
    for (const rank of ranking) {
      if (rank !== undefined) {
        delete availableNumbers[rank - 1];
      }
    }
    const rank = availableNumbers.find((n) => n);
    if (rank !== undefined) {
      ranking[index] = rank;
      setRanking(ranking);
    }
  }
};

const checkRanking = (ranking: Array<number | undefined>): RankingState => {
  const unnumbered = ranking.filter((r) => r === undefined).length;
  if (unnumbered === ranking.length) {
    return RankingState.NotStarted;
  } else if (unnumbered === 0) {
    return RankingState.Complete;
  } else {
    return RankingState.Incomplete;
  }
};

const renderHelp = (ranking: Array<number | undefined>) => {
  const rankingState = checkRanking(ranking);

  switch (rankingState) {
    case RankingState.NotStarted:
      return (
        <div class={`${style.help} ${style.helpNotStarted}`}>
          🌭 Click on a box to select your number 1 and start filling out the
          ballot.
        </div>
      );
    case RankingState.Incomplete:
      return (
        <div class={`${style.help} ${style.helpIncomplete}`}>
          ⚠️ Ballot not valid yet, keep numbering all the boxes to make your
          vote count!
        </div>
      );
    case RankingState.Complete:
      return (
        <div class={`${style.help} ${style.helpComplete}`}>
          🥳 Ballot valid! Why don't you take a screenshot now (zoom out to see
          all boxes if necessary).
        </div>
      );
  }
};

const renderCandidate = (
  candidate: HouseCandidate,
  index: number,
  ranking: Array<number | undefined>,
  setRanking: StateUpdater<Array<number | undefined>>
) => {
  const onClick = () => {
    updateRanking(index, ranking, setRanking);
  };

  return (
    <div class={style.candidateDiv}>
      <div class={commonStyle.rankingBox} onClick={onClick}>
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

  const [ranking, setRanking] = useState<Array<number | undefined>>(
    Array(candidates.length).fill(undefined)
  );

  return (
    <div class={style.ballotContainer}>
      {renderHelp(ranking)}
      <div class={style.ballot}>
        <p class={style.division}>Electoral Division of {division}</p>
        <p class={style.how}>
          Number the boxes from 1 to {candidates.length} in the order of your
          choice.
        </p>

        {candidates.map((c, i) => renderCandidate(c, i, ranking, setRanking))}
      </div>
    </div>
  );
};

export default HouseBallot;
