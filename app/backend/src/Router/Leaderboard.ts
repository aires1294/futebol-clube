import { Router, Request, Response } from 'express';
import LeaderBoardController from '../controllers/LeaderBoard';

const LeaderboardRouter = Router();

LeaderboardRouter.get('/', (req: Request, res: Response) => LeaderBoardController
  .getHomeLeaderboard(req, res));

export default LeaderboardRouter;
