import { Router, Request, Response } from 'express';
// import Teams from 'src/controllers/Teams';
import MatchesController from '../controllers/Matches';

const MatchesRouter = Router();

// MatchesRouter.get('/', (req: Request, res: Response) => MatchesController.getAllMatches(req, res));
MatchesRouter.get('/', (req: Request, res: Response) => MatchesController.getMatches(req, res));

// TeamRouter.get('/:id', (req: Request, res: Response) => TeamsController.getTeamById(req, res));

export default MatchesRouter;
