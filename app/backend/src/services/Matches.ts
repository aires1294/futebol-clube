import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

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
}
