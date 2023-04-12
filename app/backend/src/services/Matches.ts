import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

// interface IEditMatch {
//   homeTeamGoals: number;
//   awayTeamsGoals: number;
// }
interface ICreateMatch {
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export default class MatchesService {
  static async getAllMatches(): Promise<Matches[]> {
    const matches = await Matches.findAll({
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

    console.log('service', matches);
    return matches;
  }

  static async getMatches(inProgress?: boolean): Promise<Matches[]> {
    const filteredMatches = inProgress ? { inProgress } : { inProgress: false };
    console.log('testandoo', filteredMatches);

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
    return matches;
  }

  static async endMatch(id: number) {
    const match = await Matches.update({ inProgress: false }, { where: { id } });
    return match;
  }

  // DUAS MANEIRAS DE FAZER O REQ 18

  // static async updateMatch(id: number, body: IEditMatch) {
  //   const match = await Matches.update({ homeTeamGoals: body.homeTeamGoals,
  //     awayTeamGoals: body.awayTeamsGoals }, { where: { id } });
  //   return match;
  // }
  static async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    const match = await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return match;
  }

  static async createMatch(partida: ICreateMatch): Promise<Matches> {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = partida;
    const match = await Matches
      .create({ homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress: true });
    console.log('testando createMatch', match);
    return match;
  }
}
