# AusBallot

Code for <https://ausballot.netlify.app/>

The AEC (Australian Electoral Commission) has this page to view all the candidates for an upcoming election:
https://www.aec.gov.au/election/candidates.htm

The problem with that is that it's a flat wall of text which is kind of hard to navigate.

Wouldn't it be good if you could see a preview of what the actual ballot paper looked like for your area,
so that you can look at it and calmly decide where to put your vote before the polling booth?

That's what this tiny website does.

## Disclaimer

This is not an official government website about the Australian election ballot.

There are about 5% of the total votes classified as informal (invalid) because of a number of reasons.

This website contains actual candidate information retrieved from the official government website.

This website is designed to help voters see who the candidates in their actual ballot papers are and what it will look like on the day.

This website also helps voters practice voting and prepare for polling day.

Voters can practice filling out their ballot papers, or even take a screenshot of the practice vote and copy what they have decided/prepared to the actual ballots on the day.

## References

- Downloads (CSVs): <https://www.aec.gov.au/election/downloads.htm>
- Example ballots: <https://www.aec.gov.au/Voting/How_to_vote/practice/practice-house-of-reps.htm>

## Development

- `npm install`: Installs dependencies

- `npm run dev`: Run a development, HMR server

- `npm run serve`: Run a production-like server

- `npm run build`: Production-ready build

- `npm run lint`: Pass TypeScript files using ESLint

- `npm run test`: Run Jest and Enzyme with
  [`enzyme-adapter-preact-pure`](https://github.com/preactjs/enzyme-adapter-preact-pure) for
  your tests

For detailed explanation on how things work, checkout the [CLI Readme](https://github.com/developit/preact-cli/blob/master/README.md).

## House/senate candidate data

The candidate data (in the `data` directory) was downloaded as `.csv` files from the AEC website here: <https://www.aec.gov.au/election/downloads.htm>

It was then transformed into `.json` using the script `npx ts-node scripts/csv-to-json.ts`.

We can run some analysis on the data using [jq](https://stedolan.github.io/jq/):

```
# Longest house ballot (max number of candidates):
$ jq '[.[] | .[] | length] | max' src/data/house-candidates.json
12

# All electorates with how many candidates they have:
$ jq -r '.[] | to_entries[] | .key + "," + (.value | length | tostring)' src/data/house-candidates.json | sort -t, -k2 -n
...

# How many columns each state senate ballot has:
$ jq -r 'to_entries[] | .key + ": " + (.value | length | tostring)' src/data/senate-candidates.json
ACT: 12
NSW: 24
NT: 9
QLD: 26
SA: 23
TAS: 15
VIC: 27
WA: 23
```
