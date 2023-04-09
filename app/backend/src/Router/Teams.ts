import { Response, Request, Router } from 'express';
// import Teams from 'src/controllers/Teams';
import TeamsController from '../controllers/Teams';

const TeamRouter = Router();

TeamRouter.get('/', (req: Request, res: Response) => TeamsController.getTeams(req, res));
TeamRouter.get('/:id', (req: Request, res: Response) => TeamsController.getTeamById(req, res));

export default TeamRouter;
