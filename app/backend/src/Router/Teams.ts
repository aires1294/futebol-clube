import { Response, Request, Router } from 'express';
// import Teams from 'src/controllers/Teams';
import TeamsController from '../controllers/Teams';

const TeamRouter = Router();

// const teams = new TeamsController();

TeamRouter.get('/', (req: Request, res: Response) => TeamsController.getTeams(req, res));

export default TeamRouter;
