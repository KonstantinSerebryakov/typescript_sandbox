// const TIMESTAMPS_COUNT = 50000;

// const PROBABILITY_SCORE_CHANGED = 0.0001;

// const PROBABILITY_HOME_SCORE = 0.45;

// const OFFSET_MAX_STEP = 3;

// export type Score = {
//   home: number;
//   away: number;
// };

// export type Stamp = {
//   offset: number;
//   score: Score;
// };

// const emptyScoreStamp: Stamp = {
//   offset: 0,
//   score: {
//     home: 0,
//     away: 0,
//   },
// };

// export const generateStamps = (): Stamp[] => {
//   const scoreStamps = Array(TIMESTAMPS_COUNT)
//     .fill(emptyScoreStamp)
//     .map(
//       ((acc) => () => {
//         const scoreChanged = Math.random() > 1 - PROBABILITY_SCORE_CHANGED;
//         const homeScoreChange =
//           scoreChanged && Math.random() < PROBABILITY_HOME_SCORE ? 1 : 0;
//         const awayScoreChange = scoreChanged && !homeScoreChange ? 1 : 0;
//         return {
//           offset: (acc.offset +=
//             Math.floor(Math.random() * OFFSET_MAX_STEP) + 1),
//           score: {
//             home: (acc.score.home += homeScoreChange),
//             away: (acc.score.away += awayScoreChange),
//           },
//         };
//       })(emptyScoreStamp)
//     );

//   return scoreStamps;
// };

// export const getScore = (gameStamps: Stamp[], offset: number): Score => {
//   if (offset < 0) {
//     throw new RangeError("offset should be positive");
//   }
//   if (gameStamps.length === 0 || gameStamps[0].offset > offset) {
//     return { home: 0, away: 0 };
//   }

//   const index = binarySearchStampIndex(gameStamps, offset);
//   return gameStamps[index].score;

//   // NOTE FOR REVIEWER: utility which can and should be outside this function, may be private method
//   function binarySearchStampIndex(gameStamps: Stamp[], offset: number): number {
//     let left = 0;
//     let right = gameStamps.length - 1;
//     let middle;
//     while (left <= right) {
//       middle = Math.floor((left + right) / 2);
//       const midOffset = gameStamps[middle].offset;
//       if (midOffset <= offset) left = middle + 1;
//       else if (midOffset > offset) right = middle - 1;
//     }
//     return left - 1;
//   }
// };

// function gen(scales: number[]) {
//   function generateStampMock(scale: number): Stamp {
//     return {
//       offset: scale,
//       score: { home: scale, away: scale },
//     };
//   }
//   function generateStampsMock(scales: number[]): Stamp[] {
//     return scales.map(generateStampMock);
//   }
//   return generateStampsMock(scales);
// }
// const st = {
//   home: 123,
//   away: 123,
// };
// const off1 = 10;
// const stamps2 = gen([1, 2, 3, off1 - 2]);
// // const stamps2 = gen([1, 2, off1 - 1, off1 + 1, 20, 30]);
// const stamps1 = [{ offset: 0, score: st }].concat(gen([1, 2, 3]));
// const stamps = generateStamps();
// // const off = stamps[48501].offset;
// // const off = (stamps[48500].offset + stamps[48501].offset) / 2;
// // const score = getScore(stamps, off);
// let score;
// score = getScore(stamps2, off1);
// // score = getScore([], 200000);
// console.log(score);
// // score = getScore(stamps, 200000);
// // console.log(score);
// // score = getScore(stamps, 0);
// // console.log(score);
// // score = getScore(stamps, 1);
// // console.log(score);
// // score = getScore(stamps, 2);
// // console.log(score);
// // score = getScore(stamps, 3);
// // console.log(score);
// // score = getScore(stamps, 4);
// // console.log(score);
// // const score = getScore([stamps[0]], off);
// // console.log(score);

// let arr;
// arr = new Array(4294967295);
// // arr.push(123);
// console.log(arr.length);

import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
