export enum RankingState {
  NotStarted,
  Incomplete,
  Complete,
}

export class Ranking {
  ranking: Array<number | undefined>;

  constructor(ranking: Array<number | undefined>) {
    this.ranking = ranking;
  }

  static empty(length: number): Ranking {
    return new Ranking(Array(length).fill(undefined));
  }

  check(): RankingState {
    const numbered = this.ranking.filter((r) => r !== undefined).length;
    if (numbered === 0) {
      return RankingState.NotStarted;
    } else if (numbered === this.ranking.length) {
      return RankingState.Complete;
    } else {
      return RankingState.Incomplete;
    }
  }

  toggleRanking(index: number): Ranking {
    if (this.ranking[index] !== undefined) {
      return this.updatedRanking(index, undefined);
    } else {
      const availableNumbers = Array.from({ length: 10 }, (x, i) => i + 1);
      for (const rank of this.ranking) {
        if (rank !== undefined) {
          delete availableNumbers[rank - 1];
        }
      }
      const rank = availableNumbers.find((n) => n);
      if (rank !== undefined) {
        return this.updatedRanking(index, rank);
      } else {
        return this;
      }
    }
  }

  updatedRanking(index: number, number: number | undefined): Ranking {
    const newRanking = new Ranking([...this.ranking]);
    newRanking.ranking[index] = number;
    return newRanking;
  }
}
