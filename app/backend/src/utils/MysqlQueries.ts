export const leaderboardHomeQuery = `
  SELECT t.team_name AS name,
    SUM(
      CASE WHEN m.home_team_goals > m.away_team_goals THEN 3
      WHEN m.home_team_goals = m.away_team_goals THEN 1
      ELSE 0 
      END) AS totalPoints,
    COUNT(m.id) AS totalGames,
    SUM(CASE WHEN m.home_team_goals > m.away_team_goals THEN 1 ELSE 0 END) AS totalVictories,
    SUM(CASE WHEN m.home_team_goals = m.away_team_goals THEN 1 ELSE 0 END) AS totalDraws,
    SUM(CASE WHEN m.home_team_goals < m.away_team_goals THEN 1 ELSE 0 END) AS totalLosses,
    SUM(m.home_team_goals) AS goalsFavor,
    SUM(m.away_team_goals) AS goalsOwn
  FROM teams AS t
  INNER JOIN matches AS m
  ON t.id = m.home_team_id
  WHERE m.in_progress = 0
  GROUP BY t.id;
`;

export const leaderboardAwayQuery = `
  SELECT t.team_name AS name,
      SUM(
        CASE WHEN m.away_team_goals > m.home_team_goals THEN 3
        WHEN m.away_team_goals = m.home_team_goals THEN 1
        ELSE 0 
        END) AS totalPoints,
      COUNT(m.id) AS totalGames,
      SUM(CASE WHEN m.away_team_goals > m.home_team_goals THEN 1 ELSE 0 END) AS totalVictories,
      SUM(CASE WHEN m.away_team_goals = m.home_team_goals THEN 1 ELSE 0 END) AS totalDraws,
      SUM(CASE WHEN m.away_team_goals < m.home_team_goals THEN 1 ELSE 0 END) AS totalLosses,
      SUM(m.away_team_goals) AS goalsFavor,
      SUM(m.home_team_goals) AS goalsOwn
  FROM teams AS t
  INNER JOIN matches AS m
  ON t.id = m.away_team_id
  WHERE m.in_progress = 0
  GROUP BY t.id;
`;

export const leaderboardAllQuery = `
SELECT
  teams.team_name AS name,
  SUM(
    CASE WHEN teams.team_name = homeTeams.team_name 
            AND matches.home_team_goals > matches.away_team_goals THEN 3
         WHEN teams.team_name = awayTeams.team_name 
            AND matches.away_team_goals > matches.home_team_goals THEN 3
         WHEN matches.home_team_goals = matches.away_team_goals THEN 1 ELSE 0 
         END
  ) AS totalPoints,
  COUNT(matches.id) AS totalGames,
  SUM(
    CASE WHEN teams.team_name = homeTeams.team_name 
          AND matches.home_team_goals > matches.away_team_goals THEN 1
         WHEN teams.team_name = awayTeams.team_name 
          AND matches.away_team_goals > matches.home_team_goals THEN 1 ELSE 0 
         END
  ) AS totalVictories,
  SUM(CASE WHEN matches.home_team_goals = matches.away_team_goals THEN 1 ELSE 0 END) AS totalDraws,
  SUM(
    CASE WHEN teams.team_name = homeTeams.team_name 
          AND matches.home_team_goals < matches.away_team_goals THEN 1
         WHEN teams.team_name = awayTeams.team_name 
          AND matches.away_team_goals < matches.home_team_goals THEN 1 ELSE 0 END
  ) AS totalLosses,
    SUM(CASE WHEN teams.team_name = homeTeams.team_name 
      THEN matches.home_team_goals ELSE matches.away_team_goals END) AS goalsFavor,
    SUM(CASE WHEN teams.team_name = homeTeams.team_name 
      THEN matches.away_team_goals ELSE matches.home_team_goals END) AS goalsOwn,
    SUM(CASE WHEN teams.team_name = homeTeams.team_name 
      THEN matches.home_team_goals ELSE matches.away_team_goals END) - 
    SUM(CASE WHEN teams.team_name = awayTeams.team_name 
      THEN matches.home_team_goals ELSE matches.away_team_goals END) AS goalsBalance,
  ROUND((
    SUM(
      CASE WHEN teams.team_name = homeTeams.team_name 
            AND matches.home_team_goals > matches.away_team_goals THEN 3
           WHEN teams.team_name = awayTeams.team_name 
            AND matches.away_team_goals > matches.home_team_goals THEN 3
           WHEN matches.home_team_goals = matches.away_team_goals THEN 1 ELSE 0 END
    ) / (COUNT(matches.id) * 3)
  ) * 100, 2) AS efficiency
FROM teams
LEFT JOIN matches ON teams.id = matches.home_team_id OR teams.id = matches.away_team_id
LEFT JOIN teams AS homeTeams ON matches.home_team_id = homeTeams.id
LEFT JOIN teams AS awayTeams ON matches.away_team_id = awayTeams.id
WHERE matches.in_progress = false
GROUP BY teams.team_name
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC;
`;
