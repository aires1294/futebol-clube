import { Router, Request, Response } from 'express';
// import Teams from 'src/controllers/Teams';
import { validateAuth } from '../Authentication/middlewares';
import MatchesController from '../controllers/Matches';

const MatchesRouter = Router();

// MatchesRouter.get('/', (req: Request, res: Response) => MatchesController.getAllMatches(req, res));
MatchesRouter.get('/', (req: Request, res: Response) => MatchesController
  .getMatches(req, res));
MatchesRouter.patch('/:id/finish', validateAuth, (req: Request, res: Response) => MatchesController
  .endMatch(req, res));
MatchesRouter.patch('/:id', validateAuth, (req: Request, res: Response) => MatchesController
  .updateMatch(req, res));
MatchesRouter.post('/', validateAuth, (req: Request, res: Response) => MatchesController
  .createMatch(req, res));

// TeamRouter.get('/:id', (req: Request, res: Response) => TeamsController.getTeamById(req, res));

export default MatchesRouter;
