import * as express from 'express';
// import TeamsController from './controllers/Teams';
import UsersController from './controllers/User';
import { validateLoginBody,
  validateEmail,
  validatePassword,
  validateAuth } from './Authentication/middlewares';
import MatchesController from './controllers/Matches';
// import ValidationToken from './Authentication/token';
import TeamRouter from './Router/Teams';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use('/teams', TeamRouter);
    this.app.post(
      '/login',
      validateLoginBody,
      validateEmail,
      validatePassword,
      UsersController.login,
    );
    this.app.get('/login/role', validateAuth, UsersController.getRole);
    this.app.get('/matches', MatchesController.getMatches);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
