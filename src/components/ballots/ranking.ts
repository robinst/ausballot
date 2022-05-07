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

  hasStarted(): boolean {
    const filled = this.ranking.filter((r) => r !== undefined);
    return filled.length > 0;
  }

  check(required?: number): RankingState {
    const requiredNumber =
      required !== undefined ? required : this.ranking.length;

    const filled = this.ranking.filter((r) => r !== undefined);
    if (filled.length === 0) {
      return RankingState.NotStarted;
    } else if (filled.length >= requiredNumber) {
      // We have the required count of numbers, but need to check that they're contiguous (e.g. 1 to 6).
      filled.sort((a, b) => (a || 0) - (b || 0));
      for (let i = 0; i < filled.length; i++) {
        if (filled[i] !== i + 1) {
          // TODO: Does this need to be a different state?
          return RankingState.Incomplete;
        }
      }

      return RankingState.Complete;
    }
    return RankingState.Incomplete;
  }

  cleared(): Ranking {
    return Ranking.empty(this.ranking.length);
  }

  toggleRanking(index: number): Ranking {
    if (this.ranking[index] !== undefined) {
      return this.updatedRanking(index, undefined);
    }
    const availableNumbers = Array.from(
      { length: this.ranking.length },
      (x, i) => i + 1
    );
    for (const rank of this.ranking) {
      if (rank !== undefined) {
        delete availableNumbers[rank - 1];
      }
    }
    const rank = availableNumbers.find((n) => n);
    if (rank !== undefined) {
      return this.updatedRanking(index, rank);
    }
    return this;
  }

  updatedRanking(index: number, number: number | undefined): Ranking {
    const newRanking = new Ranking([...this.ranking]);
    newRanking.ranking[index] = number;
    return newRanking;
  }
}
