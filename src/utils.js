import { colors, indexes } from "./const";

export function createNewSet() {
  let result = [];
  let f1 = -1, f2 = -1, f3 = -1;
  for (let i = 0; i < Math.pow(6, 4); i++) {
    if (i % Math.pow(6, 3) === 0) f1++;
    if (f1 === 6) f1 = 0;

    if (i % Math.pow(6, 2) === 0) f2++;
    if (f2 === 6) f2 = 0;

    if (i % 6 === 0) f3++;
    if (f3 === 6) f3 = 0;

    result.push(
      indexes[f1] + indexes[f2] + indexes[f3] + indexes[i % 6]
    );
  }
  return result;
}

export function encode(codeArr) {
  return codeArr?.map(el => indexes[colors.findIndex(it => it === el)]).join("");
}

export function decode(str) {
  return str.split("").map(el => colors[Number(el)]);
}

export function checkStrings(hidden, trial) {
  hidden = hidden.split("");
  trial = trial.split("");
  let bulls = 0, cows = 0;

  trial = trial.map((el, i) => {
    if (el === hidden[i]) {
      bulls++;
      el = "-";
      hidden[i] = null;
    }
    return el;
  });

  trial = trial.map((el) => {
    const index = hidden.findIndex((a) => a === el);
    if (index > 0) {
      cows++;
      el = "-";
      hidden[index] = null;
    }
    return el;
  });
  
  return [bulls, cows];
}

export function filterSet(set, { str, bulls, cows }) {
  return set.filter((num) => {
    const [resB, resC] = checkStrings(num, str);
    return resB === bulls && resC === cows;
  });
}

function filterSetCount(set, { str, bulls, cows }) {
  return set.reduce((acc, num) => {
    const [resB, resC] = checkStrings(num, str);
    return acc + !(resB === bulls && resC === cows);
  }, 0);
}

export function buildHypothesis(set) {
  const hyp = {};
  createNewSet().forEach((num) => {
    const results = [];
    for (let b = 0; b < 5; b++) {
      for (let c = 0; c < 5 - b; c++) {
        if (b === 0 && c === 0) continue;
        results.push(filterSetCount(set, { str: num, bulls: b, cows: c }));
      }
    }
    hyp[num] = Math.min(...results);
  });
  return hyp;
}