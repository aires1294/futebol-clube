import LeaderBoardService from '../services/LeaderBoard';

export default class LeaderBoardController {
  constructor(
    private _serviceLeaderBoard = new LeaderBoardService(),
  ) {}

    public async getResultsAway(_req: Request, _res: Response): Promise<Response | void {
        const leader = await this._serviceLeaderBoard.getAllResults('away');
        res.status(200).json(leader)
    }  


}
