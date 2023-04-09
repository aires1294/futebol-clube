import Teams from '../database/models/Teams';
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

// export default class MatchesService {
//   static async getMatches(): Promise<Matches[]> {
//     const matches = await Matches.findAll();
//     console.log('service', matches);
//     return matches;
//   }
// }

export default class MatchesService {
  static async getMatches(inProgress?: boolean): Promise<Matches[]> {
    const filteredMatches = inProgress ? { inProgress } : { inProgress: false };
    const matches = await Matches.findAll({
      where: filteredMatches,
      include: [
        {
          model: Teams,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: Teams,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
    // console.log('service', matches);
    return matches;
  }
}
