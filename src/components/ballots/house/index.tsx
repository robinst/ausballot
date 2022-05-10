import { FunctionalComponent, h } from "preact";
import style from "./style.css";
import commonStyle from "../style.css";
import houseCandidates from "../../../data/house-candidates.json";
import { StateUpdater, useEffect, useState } from "preact/hooks";
import { Ranking, RankingState } from "../ranking";

interface Props {
  state: string;
  division: string;
}

type HouseCandidates = {
  [key: string]: {
    [key: string]: HouseCandidate[];
  };
};

type HouseCandidate = {
  surname: string;
  ballotGivenName: string;
  partyBallotName: string;
};

const getLocalStorageKey = (state: string, division: string) =>
  `ranking.house.2022.${state}.${division}`;

const renderHelp = (ranking: Ranking) => {
  const rankingState = ranking.check();

  switch (rankingState) {
    case RankingState.NotStarted:
      return (
        <div class={`${commonStyle.help} ${commonStyle.helpNotStarted}`}>
          🌭 Click on a box to select your number 1 and start filling out the
          ballot.
        </div>
      );
    case RankingState.Incomplete:
      return (
        <div class={`${commonStyle.help} ${commonStyle.helpIncomplete}`}>
          ⚠️ Ballot not complete yet, keep numbering all the boxes!
        </div>
      );
    case RankingState.Complete:
      return (
        <div class={`${commonStyle.help} ${commonStyle.helpComplete}`}>
          🥳 Done! Why don't you take a screenshot now as a reminder (zoom out
          to see all boxes if needed).
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

  const candidates = (houseCandidates as HouseCandidates)[state][division];
  const localStorageKey = getLocalStorageKey(state, division);

  const [ranking, setRanking] = useState(() =>
    Ranking.load(candidates.length, localStorageKey)
  );

  useEffect(() => {
    ranking.store(localStorageKey);
  }, [ranking, localStorageKey]);

  return (
    <div>
      {renderHelp(ranking)}
      <div class={style.ballot}>
        <p class={style.division}>Electoral Division of {division}</p>
        <p class={style.how}>
          Number the boxes from 1 to {candidates.length} in the order of your
          choice.
        </p>

        {candidates.map((c, i) => renderCandidate(c, i, ranking, setRanking))}

        {ranking.hasStarted() && (
          <button
            class={style.clearButton}
            onClick={() =>
              confirm("Clear your vote?") && setRanking(ranking.cleared())
            }
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default HouseBallot;
