import { writeFileSync, readFileSync, createReadStream } from "fs";
import * as readline from "readline";

async function* readCsv(path) {
  const file = createReadStream(path);
  const rl = readline.createInterface(file);
  const separator = ",";

  let columns;
  for await (let line of rl) {
    line = line.trim();
    if (columns === undefined) {
      // First line is headers
      columns = line.split(separator);
    } else {
      const values = line.split(separator);
      const entries = columns.map((k, i) => [k, values[i]]);

      yield Object.fromEntries(entries);
    }
  }
}

async function getSenate() {
  const senateCandidates = {};
  let currentState = "";
  let groups = [];
  let currentGroup: any = {};
  for await (const record of readCsv("data/senate-candidates.csv")) {
    // header: state,column,ballotPosition,surname,ballotGivenName,groupName,partyBallotName

    if (record.state !== currentState) {
      // New state
      currentState = record.state;

      groups = [];
      currentGroup = {};
      senateCandidates[currentState] = groups;
    }

    if (
      Object.keys(currentGroup).length === 0 ||
      currentGroup.column !== record.column
    ) {
      // New group (column)
      currentGroup = {};
      groups.push(currentGroup);

      currentGroup.column = record.column;
      currentGroup.groupName = record.groupName;
      currentGroup.candidates = [];
    }

    const candidate: any = {};
    candidate.surname = record.surname;
    candidate.ballotGivenName = record.ballotGivenName;
    candidate.partyBallotName = record.partyBallotName;
    currentGroup.candidates.push(candidate);
  }

  return senateCandidates;
}

async function getHouse() {
  const houseCandidates = {};
  let currentState = "";
  let divisions = {};
  let currentDivision = "";
  let candidates = [];
  for await (const record of readCsv("data/house-candidates.csv")) {
    // header: state,division,ballotPosition,surname,ballotGivenName,partyBallotName

    if (record.state !== currentState) {
      // New state
      currentState = record.state;

      divisions = {};
      currentDivision = "";
      houseCandidates[currentState] = divisions;
    }

    if (record.division !== currentDivision) {
      // New division
      currentDivision = record.division;

      candidates = [];
      divisions[record.division] = candidates;
    }

    const candidate: any = {};
    candidate.surname = record.surname;
    candidate.ballotGivenName = record.ballotGivenName;
    candidate.partyBallotName = record.partyBallotName;
    candidates.push(candidate);
  }

  return houseCandidates;
}

(async () => {
  console.log(JSON.stringify(await getHouse()));
  console.log(JSON.stringify(await getSenate()));

  // const file = createReadStream();
  // const rl = readline.createInterface(file);
  //
  // const columns = [];
  // for await (const line of rl) {
  //     if (columns.length == 0) {
  //         columns = line.split(',');
  //     }
  //
  //     console.log(line);
  // }
})();

// await foo();
//
//
// let house = readFileSync("data/house-candidates.csv", {encoding: 'utf-8'});
// house
//
// console.log("Hello?");
