import { Ranking, RankingState } from "../src/components/ballots/ranking";

describe("Ranking class", () => {
  test("works for ranking that needs all places numbered", () => {
    let ranking = Ranking.empty(3);
    expect(ranking.check()).toBe(RankingState.NotStarted);

    ranking = ranking.toggleRanking(1);
    expect(ranking.check()).toBe(RankingState.Incomplete);

    ranking = ranking.toggleRanking(0);
    expect(ranking.check()).toBe(RankingState.Incomplete);

    ranking = ranking.toggleRanking(2);
    expect(ranking.check()).toBe(RankingState.Complete);

    expect(ranking.ranking).toStrictEqual([2, 1, 3]);

    ranking = ranking.toggleRanking(0);
    expect(ranking.check()).toBe(RankingState.Incomplete);

    expect(ranking.ranking).toStrictEqual([undefined, 1, 3]);
  });

  test("works for ranking that has a minimum number", () => {
    // 5 things to be ranked, but only 1 to 3 required.

    let ranking = Ranking.empty(5);
    expect(ranking.check(3)).toBe(RankingState.NotStarted);

    ranking = ranking.toggleRanking(1);
    expect(ranking.check(3)).toBe(RankingState.Incomplete);

    ranking = ranking.toggleRanking(0);
    expect(ranking.check(3)).toBe(RankingState.Incomplete);

    ranking = ranking.toggleRanking(2);
    expect(ranking.check(3)).toBe(RankingState.Complete);

    expect(ranking.ranking).toStrictEqual([2, 1, 3, undefined, undefined]);

    ranking = ranking.toggleRanking(0);
    expect(ranking.check(3)).toBe(RankingState.Incomplete);

    expect(ranking.ranking).toStrictEqual([
      undefined,
      1,
      3,
      undefined,
      undefined,
    ]);

    ranking = ranking.toggleRanking(0);
    expect(ranking.check(3)).toBe(RankingState.Complete);

    expect(ranking.ranking).toStrictEqual([2, 1, 3, undefined, undefined]);
  });

  test("works for a large number", () => {
    let ranking = Ranking.empty(15);
    ranking = ranking.toggleRanking(0);
    ranking = ranking.toggleRanking(1);
    ranking = ranking.toggleRanking(2);
    ranking = ranking.toggleRanking(3);
    ranking = ranking.toggleRanking(4);
    ranking = ranking.toggleRanking(5);
    ranking = ranking.toggleRanking(6);
    ranking = ranking.toggleRanking(7);
    ranking = ranking.toggleRanking(8);
    ranking = ranking.toggleRanking(9);
    ranking = ranking.toggleRanking(10);
    ranking = ranking.toggleRanking(11);
    ranking = ranking.toggleRanking(12);

    expect(ranking.check(6)).toBe(RankingState.Complete);
  });
});
