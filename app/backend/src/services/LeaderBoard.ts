import ILeaderBoard from '../interfaces/ILeaderBoard';
import Teams from '../database/models/Teams';
import TeamsService from './Teams';
import MatchesService from './Matches';
import { sortedLeaderboard } from '../utils/LeaderBoard';

const LeaderBoardService = {
  async home() {
    const allMatches = await MatchesService.fetchInProgress(false);
    const teamsLeaderboardHome = getStatus(allMatches, true);
    return sortedLeaderboard(teamsLeaderboardHome);
  },
};
