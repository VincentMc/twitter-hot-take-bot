interface TalkingPoint {
  thing: string,
  soundBites: Array<string>,
}

export const POSITIVETALKINGPOINTS: Array<string> = [
  'clutch gene',
  'clutch',
  'killer will',
  'desire',
  'diet mountain dew',
  'hazel the dog',
  'Ernestine',
  'rising to the challenge',
  'Batman',
  'Superstar',
];

export const NEGATIVETALKINGPOINTS: Array<string> = [
  'stat padding',
  'lack of clutch gene',
  'bricked threes',
  'overrated',
  'LeShannon Sharpe',
  'lights too bright',
  'shrinking',
  'Robin',
  'frontrunning',
];

export const WILDCARDTALKINGPOINTS: Array<string> = [
  'overrated',
  'cringy',
  'crazy fans',
];

export const GOATTALKINGPOINTS: Array<string> = [
  'clutch gene',
  'clutch',
  'psychomode',
  'goat',
];

export const TOPICS: Array<TalkingPoint> = [
  { thing: 'Anthony Davis', soundBites: NEGATIVETALKINGPOINTS },
  { thing: 'Chris Paul', soundBites: NEGATIVETALKINGPOINTS },
  { thing: 'Damian Lillard', soundBites: NEGATIVETALKINGPOINTS },
  { thing: 'Devin Booker', soundBites: POSITIVETALKINGPOINTS },
  { thing: 'Donovan Mitchell', soundBites: NEGATIVETALKINGPOINTS },
  { thing: 'Giannis Antetokounmpo', soundBites: NEGATIVETALKINGPOINTS },
  { thing: 'James Harden', soundBites: NEGATIVETALKINGPOINTS },
  { thing: 'Jayson Tatum', soundBites: NEGATIVETALKINGPOINTS },
  { thing: 'Jimmy Butler', soundBites: POSITIVETALKINGPOINTS },
  { thing: 'Joel Embiid', soundBites: POSITIVETALKINGPOINTS },
  { thing: 'Kawhi Leonard', soundBites: POSITIVETALKINGPOINTS },
  { thing: 'Kevin Durant', soundBites: POSITIVETALKINGPOINTS },
  { thing: 'Lebron James', soundBites: NEGATIVETALKINGPOINTS },
  { thing: 'Luka Dončić', soundBites: NEGATIVETALKINGPOINTS },
  { thing: 'Nikola Jokić', soundBites: NEGATIVETALKINGPOINTS },
  { thing: 'Russell Westbrook', soundBites: NEGATIVETALKINGPOINTS },
  { thing: 'Stephen Curry', soundBites: NEGATIVETALKINGPOINTS },
  { thing: 'Tom Brady', soundBites: GOATTALKINGPOINTS },
  { thing: 'Michael Jordan', soundBites: GOATTALKINGPOINTS },
];
