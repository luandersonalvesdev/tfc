export const matchesInProgress = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: true,
    homeTeam: {
      teamName: "São Paulo"
    },
    awayTeam: {
      teamName: "Grêmio"
    }
  },
  {
    id: 2,
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 1,
    inProgress: true,
    homeTeam: {
      teamName: "Internacional"
    },
    awayTeam: {
      teamName: "Santos"
    }
  },
];

export const matchesNotInProgress = [
  {
    id: 3,
    homeTeamId: 4,
    homeTeamGoals: 3,
    awayTeamId: 11,
    awayTeamGoals: 0,
    inProgress: false,
    homeTeam: {
      teamName: "Corinthians"
    },
    awayTeam: {
      teamName: "Napoli-SC"
    }
  },
  {
    id: 4,
    homeTeamId: 3,
    homeTeamGoals: 0,
    awayTeamId: 2,
    awayTeamGoals: 0,
    inProgress: false,
    homeTeam: {
      teamName: "Botafogo"
    },
    awayTeam: {
      teamName: "Bahia"
    }
  }
];

export const allMatches = [...matchesInProgress, ...matchesNotInProgress];

export const validNewScoreboardMock = { homeTeamGoals: 20, awayTeamGoals: 20 };

export const invalidNewScoreboardMock = { awayTeamGoals: 20 };

export const invalidNewMatchInvalidId = {
  homeTeamId: 0,
  awayTeamId: 2,
  homeTeamGoals: 5,
  awayTeamGoals: 6
}

export const invalidNewMatchEqualId = {
  homeTeamId: 1,
  awayTeamId: 1,
  homeTeamGoals: 5,
  awayTeamGoals: 6
}

export const invalidNewMatchWithoutKey = {
  awayTeamId: 1,
  homeTeamGoals: 5,
  awayTeamGoals: 6
}

export const validNewMatch = {
  homeTeamId: 1,
  awayTeamId: 2,
  homeTeamGoals: 5,
  awayTeamGoals: 6
}

export const newMatchResponseMock = {
  ...validNewMatch,
  id: 49,
  inProgress: true
}

export const newMatchReturnMock = {
  dataValues: newMatchResponseMock
}