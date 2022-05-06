import { FunctionalComponent, h } from "preact";
import style from "./style.css";
import commonStyle from "../style.css";
import houseCandidates from "../../../data/house-candidates.json";
import { StateUpdater, useState } from "preact/hooks";
import { Ranking, RankingState } from "../ranking";

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

const renderHelp = (ranking: Ranking) => {
  const rankingState = ranking.check();

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
  ranking: Ranking,
  setRanking: StateUpdater<Ranking>
) => {
  const onClick = () => {
    setRanking(ranking.toggleRanking(index));
  };

  return (
    <div class={style.candidateDiv}>
      <div class={commonStyle.rankingBox} onClick={onClick}>
        {ranking.ranking[index]}
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

  const [ranking, setRanking] = useState(Ranking.empty(candidates.length));

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
