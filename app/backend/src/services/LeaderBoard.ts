import { IMatchesName } from '../interfaces/IMatchesNames';
import ILeaderBoard from '../interfaces/ILeaderBoard';
import { getFilterSats, sortedLeaderboard, totalLeaderboard } from '../utils/LeaderBoard';
import MatchesService from './Matches';

export default class LeaderboardService {
  public static async getHomeLeaderboard(): Promise<ILeaderBoard[]> {
    const matches: IMatchesName[] = await MatchesService.getMatches(false);
    const teamsLeaderboardHome: ILeaderBoard[] = getFilterSats(matches, true);
    return sortedLeaderboard(teamsLeaderboardHome);
  }

  public static async getAwayLeaderboard(): Promise<ILeaderBoard[]> {
    const matches: IMatchesName[] = await MatchesService.getMatches(false);
    const teamsLeaderboardAway: ILeaderBoard[] = getFilterSats(matches, false);
    return sortedLeaderboard(teamsLeaderboardAway);
  }

  public static async leaderBoard(): Promise<ILeaderBoard[]> {
    const matches: IMatchesName[] = await MatchesService.getMatches(false);
    const teamsLeaderboardHome: ILeaderBoard[] = getFilterSats(matches, true);
    const teamsLeaderboardAway: ILeaderBoard[] = getFilterSats(matches, false);
    const result = totalLeaderboard(teamsLeaderboardHome, teamsLeaderboardAway);
    return sortedLeaderboard(result);
  }
}
