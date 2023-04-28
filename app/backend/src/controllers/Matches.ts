import { Request, Response } from 'express';
import Teams from '../database/models/Teams';
import MatchesService from '../services/Matches';

export default class MatchesController {
  static async getMatches(req: Request, res: Response): Promise< Response | void> {
    const { inProgress } = req.query;
    // console.log('estou aqui', inProgress);
    if (inProgress === undefined) {
      const matches = await MatchesService.getAllMatches();
      return res.status(200).json(matches);
    }

    const matches = await MatchesService
      // .getMatches(inProgress as unknown as boolean);
      .getMatches(inProgress === 'true');

    return res.status(200).json(matches);
  }

  static async endMatch(req: Request, res: Response) {
    const { id } = req.params;
    await MatchesService.endMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  }

  // DUAS MANEIRAS DE FAZER O REQ 18

  // static async updateMatch(req: Request, res: Response) {
  //   const { id } = req.params;
  //   const updatedMatche = await MatchesService
  //     .updateMatch(Number(id), req.body);
  //   console.log('estou aquiiii', updatedMatche);
  //   return res.status(200).json({ message: 'changed stage' });
  // }
  static async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const updatedMatche = await MatchesService
      .updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
    console.log('estou aquiiii', updatedMatche);
    return res.status(200).json({ message: 'changed stage' });
  }

  static async createMatch(req: Request, res: Response) {
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    const home = await Teams.findByPk(homeTeamId);
    const away = await Teams.findByPk(awayTeamId);
    if (!home || !away) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    const newMatch = await MatchesService.createMatch(req.body);
    return res.status(201).json(newMatch);
  }
}
