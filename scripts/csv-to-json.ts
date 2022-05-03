import { createReadStream } from "fs";
import { parse, Parser } from "csv-parse";

function readCsv(path): Parser {
  const parser = parse({
    delimiter: ",",
    columns: true,
    bom: true,
  });
  return createReadStream(path).pipe(parser);
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
})();
