import { orderBy } from 'lodash';
import { IMatchesName } from '../interfaces/IMatchesNames';
import ILeaderBoard from '../interfaces/ILeaderBoard';

const utilsLeaderBoard: ILeaderBoard = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
};

const getTeamsHome = (match: IMatchesName, home: boolean) => {
  if (home) {
    return match.homeTeam?.teamName;
  } return match.awayTeam?.teamName;
};

// const getPoints = (match: IMatchesName, home: boolean) => {
//   if (home) {
//     if (match.homeTeamGoals > match.awayTeamGoals) return 3;
//     // if (match.homeTeamGoals === match.awayTeamGoals) return 1;
//     if (match.homeTeamGoals < match.awayTeamGoals) return 0;
//   }
//   return 1;
// };

const getPoints = (match: IMatchesName, home: boolean) => {
  if (home) {
    if (match.homeTeamGoals > match.awayTeamGoals) return 3;
    if (match.homeTeamGoals < match.awayTeamGoals) return 0;
  } else {
    if (match.homeTeamGoals < match.awayTeamGoals) return 3;
    if (match.homeTeamGoals > match.awayTeamGoals) return 0;
  }
  return 1;
};

const getGoals = (match: IMatchesName, home: boolean, favor: boolean) => {
  if (home) {
    return favor ? match.homeTeamGoals : match.awayTeamGoals;
  }
  return favor ? match.awayTeamGoals : match.homeTeamGoals;
};

const getLeaderBoard = (matches: IMatchesName[], home: boolean): ILeaderBoard =>
  matches.reduce((acc: ILeaderBoard, match: IMatchesName) => {
    const points = getPoints(match, home);
    const teamName = getTeamsHome(match, home);
    const { totalGames,
      totalVictories, totalDraws, totalLosses, totalPoints, goalsOwn, goalsFavor } = acc;
    return {
      name: teamName,
      totalGames: totalGames + 1,
      totalPoints: totalPoints + points,
      totalVictories: totalVictories + (points === 3 ? 1 : 0),
      totalDraws: totalDraws + (points === 1 ? 1 : 0),
      totalLosses: totalLosses + (points === 0 ? 1 : 0),
      goalsOwn: goalsOwn + getGoals(match, home, false),
      goalsFavor: goalsFavor + getGoals(match, home, true),
      goalsBalance: (goalsFavor + getGoals(match, home, true))
      - (goalsOwn + getGoals(match, home, false)),
      //   efficiency: Math.round((totalPoints / (totalGames * 3)) * 100),
      efficiency: Number((((totalPoints + points) / ((totalGames + 1) * 3)) * 100).toFixed(2)),
      //   efficiency: ((totalPoints / (totalGames * 3)) * 100),
      //   efficiency,

    };
  }, utilsLeaderBoard);

const sortedLeaderboard = (teams: ILeaderBoard[]): ILeaderBoard[] =>
  orderBy(
    teams,
    ['totalPoints', 'goalsBalance', 'goalsFavor', 'goalsOwn'],
    ['desc', 'desc', 'desc', 'asc'],
  );

const getFilterSats = (matches: IMatchesName[], home: boolean): ILeaderBoard[] =>
  matches.reduce((acc: ILeaderBoard[], match: IMatchesName) => {
    const stats = acc.find(({ name }) => (home
      ? name === match.homeTeam?.teamName : name === match.awayTeam?.teamName));
    if (stats) return acc;

    const teamData = matches.filter((team) => (
      home
        ? team.homeTeamId === match.homeTeamId : team.awayTeamId === match.awayTeamId));
    const teamStats = getLeaderBoard(teamData, home);

    return [...acc, teamStats];
  }, []);

const baseLeaderBoard: ILeaderBoard = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
};

const totalLeaderboard = (home: ILeaderBoard[], away: ILeaderBoard[]): ILeaderBoard[] =>
  home.map((homeTeam: ILeaderBoard) => {
    const tryFetch = away.find(({ name }) => name === homeTeam.name);
    const awayTeam: ILeaderBoard = tryFetch || baseLeaderBoard;
    const stats: ILeaderBoard = {
      name: homeTeam.name,
      totalGames: homeTeam.totalGames + awayTeam.totalGames,
      totalDraws: homeTeam.totalDraws + awayTeam.totalDraws,
      totalLosses: homeTeam.totalLosses + awayTeam.totalLosses,
      totalPoints: homeTeam.totalPoints + awayTeam.totalPoints,
      totalVictories: homeTeam.totalVictories + awayTeam.totalVictories,
      goalsFavor: homeTeam.goalsFavor + awayTeam.goalsFavor,
      goalsOwn: homeTeam.goalsOwn + awayTeam.goalsOwn,
      goalsBalance: (homeTeam.goalsFavor + awayTeam.goalsFavor)
      - (homeTeam.goalsOwn + awayTeam.goalsOwn),
      efficiency: Number((((homeTeam.totalPoints + awayTeam.totalPoints)
      / ((homeTeam.totalGames + awayTeam.totalGames) * 3)) * 100).toFixed(2)),
    };
    return stats;
  });

export { getLeaderBoard, sortedLeaderboard, getFilterSats, totalLeaderboard };
