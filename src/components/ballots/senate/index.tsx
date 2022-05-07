import { FunctionalComponent, h } from "preact";
import style from "./style.css";
import commonStyle from "../style.css";
import senateCandidates from "../../../data/senate-candidates.json";
import { stateNames } from "../constants";
import { StateUpdater, useState } from "preact/hooks";
import { Ranking, RankingState } from "../ranking";

interface Props {
  state: string;
}

type SenateCandidates = {
  [key: string]: SenateGroup[];
};

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

const renderHelp = (ranking: Ranking, groups: SenateGroup[]) => {
  const rankingState = ranking.check(6);

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
          ⚠️ Ballot not valid yet, keep numbering boxes with at least 1 to 6 to
          make your vote count!
        </div>
      );
    case RankingState.Complete: {
      const rankAndColumn = ranking.ranking
        .map(
          (rank, index) =>
            [rank, groups[index].column] as [number | undefined, string]
        )
        .filter(([rank]) => rank !== undefined);
      rankAndColumn.sort(([a], [b]) => (a || 0) - (b || 0));
      const summaryItems = rankAndColumn.map(
        ([rank, column]) => `${rank}✎${column}`
      );

      return (
        <div class={`${commonStyle.help} ${commonStyle.helpComplete}`}>
          <p>
            🥳 Ballot valid! Why don't you take a screenshot now (zoom out to
            see all boxes if necessary). Summary of your vote:
          </p>
          <p>
            {summaryItems.map((item, index) => (
              <span class={style.summaryItem} key={index}>
                {item}
              </span>
            ))}
          </p>
        </div>
      );
    }
  }
};

const renderGroup = (
  group: SenateGroup,
  index: number,
  ranking: Ranking,
  setRanking: StateUpdater<Ranking>
) => {
  const onClick = () => {
    setRanking(ranking.toggleRanking(index));
  };

  let groupDescription = group.groupName;
  if (groupDescription === null || groupDescription === "") {
    const names = group.candidates.map((c) => c.surname).join(", ");
    groupDescription = `(${names})`;
  }
  return (
    <div class={style.groupDiv} key={index}>
      <div class={style.column}>{group.column}</div>
      <div className={commonStyle.rankingBox} onClick={onClick}>
        {ranking.ranking[index]}
      </div>
      <div class={style.groupName}>{groupDescription}</div>
    </div>
  );
};

const SenateBallot: FunctionalComponent<Props> = (props: Props) => {
  const { state } = props;

  const groups = (senateCandidates as SenateCandidates)[state];

  const [ranking, setRanking] = useState(Ranking.empty(groups.length));

  const stateName = stateNames[state] || state;

  return (
    <div>
      {renderHelp(ranking, groups)}
      <div class={style.ballot}>
        <p class={style.state}>{stateName}</p>
        <p class={style.aboveTheLine}>Above the line</p>
        <p class={style.how}>
          By numbering at least <strong>6</strong> of these boxes in the order
          of your choice (with number 1 as your first choice)
        </p>

        <div class={style.groups}>
          {groups.map((g, i) => renderGroup(g, i, ranking, setRanking))}
        </div>

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

export default SenateBallot;
