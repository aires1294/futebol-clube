import { IMatchesName } from '../interfaces/IMatchesNames';
import ILeaderBoard from '../interfaces/ILeaderBoard';
import { getFilterSats, sortedLeaderboard } from '../utils/LeaderBoard';
import MatchesService from './Matches';

// export default class LeaderBoardService = {
//   async home() {
//     const matches = await MatchesService.getMatches(false);
//     const teamsHome = getFilterSats(matches, true);
//     return sortedLeaderboard(teamsHome);
//   },
// };

export default class LeaderboardService {
  public static async getHomeLeaderboard(): Promise<ILeaderBoard[]> {
    const matches: IMatchesName[] = await MatchesService.getMatches(false);
    const teamsLeaderboardHome: ILeaderBoard[] = getFilterSats(matches, true);
    return sortedLeaderboard(teamsLeaderboardHome);
  }
}