import Matches from '../database/models/Matches';

// interface MatchesData {
//   id: number,
//   homeTeamId: number,
//   homeTeamGoals: number,
//   awayTeamId: number,
//   awayTeamGoals: number,
//   inProgress: boolean,
//   homeTeam: {
//     teamName: string
//   },
//   awayTeam: {
//     teamName: string
//   }
// }

export default class MatchesService {
  static async getMatches(): Promise<Matches[]> {
    const matches = await Matches.findAll();
    console.log('service', matches);
    return matches;
  }
}
