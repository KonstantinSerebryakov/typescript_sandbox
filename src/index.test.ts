import { before } from "node:test";
import { Score, Stamp, generateStamps, getScore } from ".";

const emptyScore: Score = {
  home: 0,
  away: 0,
};
const emptyScoreStamp: Stamp = {
  offset: 0,
  score: emptyScore,
};
function generateStampMock(scale: number): Stamp {
  return {
    offset: scale,
    score: { home: scale, away: scale },
  };
}
function generateStampsMock(scales: number[]): Stamp[] {
  return scales.map(generateStampMock);
}

describe("getScore", () => {
  // stamps
  it.concurrent(
    "should through error when given stamps has 0 length and offset < 0",
    () => {
      const stamps = generateStampsMock([]);
      const offset = -1;

      const callGetScore = () => {
        getScore(stamps, offset);
      };
      const expectedType = RangeError;
      const expectedMessage = "offset should be positive";

      expect(callGetScore).toThrow(expectedType);
      expect(callGetScore).toThrow(expectedMessage);
    }
  );
  describe.each([0, 0.4, 0.6, 1, 100, Number.MAX_SAFE_INTEGER])(
    "should return emptyScore when given stamps has 0 length and offset >= 0",
    (offset: number) => {
      it.concurrent(`getScore([], ${offset})`, () => {
        const stamps = generateStampsMock([]);
        // const offset = 0;

        const recieved = getScore(stamps, offset);
        const expected = emptyScore;

        expect(recieved).toStrictEqual(expected);
      });
    }
  );
  // offset left boundary
  it.concurrent(
    "should through error when given valid stamps and offset < 0",
    () => {
      const stamps = generateStampsMock([1, 2, 3]);
      const offset = -1;

      const callGetScore = () => {
        getScore(stamps, offset);
      };
      const expectedType = RangeError;
      const expectedMessage = "offset should be positive";

      expect(callGetScore).toThrow(expectedType);
      expect(callGetScore).toThrow(expectedMessage);
    }
  );
  it.concurrent(
    "should return emptyScore when given valid stamps and offset === 0 and offset !== stamps[0].offset",
    () => {
      const stamps = generateStampsMock([1, 2, 3]);
      const offset = 0;

      const recieved = getScore(stamps, offset);
      const expected = emptyScore;

      expect(recieved).toStrictEqual(expected);
    }
  );
  it.concurrent(
    "should return stamps[0].score when given valid stamps and offset === 0 and offset === stamps[0].offset",
    () => {
      const score: Score = {
        home: 123,
        away: 123,
      };
      const stamps = [
        {
          offset: 0,
          score: score,
        },
      ].concat(generateStampsMock([1, 2, 3]));
      const offset = 0;

      const recieved = getScore(stamps, offset);
      const expected = score;

      expect(recieved).toStrictEqual(expected);
    }
  );
  it.concurrent(
    "should return emptyScore when given valid stamps and offset > 0 and offset < stamps[0].offset",
    () => {
      const stamps = generateStampsMock([10, 20, 30]);
      const offset = 1;

      const recieved = getScore(stamps, offset);
      const expected = emptyScore;

      expect(recieved).toStrictEqual(expected);
    }
  );
  it.concurrent(
    "should return score when given valid stamps and offset > 0 and offset === stamps[0].offset",
    () => {
      const offset = 10;
      const stamps = generateStampsMock([offset, 20, 30]);

      const recieved = getScore(stamps, offset);
      const expected = stamps[0].score;

      expect(recieved).toStrictEqual(expected);
    }
  );
  // offset beetween boundaries
  it.concurrent(
    "should return score when given valid stamps and offset === stamps[i].offset",
    () => {
      const offset = 10;
      const stamps = generateStampsMock([1, 2, offset, 20, 30]);

      const recieved = getScore(stamps, offset);
      const expected = stamps[2].score;

      expect(recieved).toStrictEqual(expected);
    }
  );
  it.concurrent(
    "should return left element score when given valid stamps and offset is beetween (stamps[i].offset and stamps[i+1].offset)",
    () => {
      const offset = 10;
      const stamps = generateStampsMock([1, 2, offset - 1, offset + 1, 20, 30]);

      const recieved = getScore(stamps, offset);
      const expected = stamps[2].score;

      expect(recieved).toStrictEqual(expected);
    }
  );
  // offset right boundaries
  it.concurrent(
    "should return last element score when given valid stamps and offset > stamps[stamps.length - 1].offset",
    () => {
      const offset = 10;
      const stamps = generateStampsMock([1, 2, 3, offset - 2]);

      const recieved = getScore(stamps, offset);
      const expected = stamps[stamps.length - 1].score;

      expect(recieved).toStrictEqual(expected);
    }
  );
  it.concurrent(
    "should return last element score when given valid stamps and offset === stamps[stamps.length - 1].offset",
    () => {
      const offset = 10;
      const stamps = generateStampsMock([1, 2, 3, offset]);

      const recieved = getScore(stamps, offset);
      const expected = stamps[stamps.length - 1].score;

      expect(recieved).toStrictEqual(expected);
    }
  );
});
