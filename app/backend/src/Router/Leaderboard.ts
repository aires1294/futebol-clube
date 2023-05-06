import { Router, Request, Response } from 'express';
import LeaderBoardController from '../controllers/LeaderBoard';

const LeaderboardRouter = Router();

LeaderboardRouter.get('/home', (req: Request, res: Response) => LeaderBoardController
  .getHomeLeaderboard(req, res));

LeaderboardRouter.get('/away', (req: Request, res: Response) => LeaderBoardController
  .getAwayLeaderboard(req, res));

LeaderboardRouter.get('/', (req: Request, res: Response) => LeaderBoardController
  .leaderBoard(req, res));

export default LeaderboardRouter;
