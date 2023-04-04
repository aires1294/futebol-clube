import * as express from 'express';
import TeamsController from './controllers/Teams';
import UsersController from './controllers/User';
import { validateLoginBody, validateEmail, validatePassword } from './Authentication/middlewares';
// import TeamRouter from './Router/Teams';

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
    this.app.get('/teams', TeamsController.getTeams);
    this.app.get('/teams/:id', TeamsController.getTeamById);
    this.app.post(
      '/login',
      validateLoginBody,
      validateEmail,
      validatePassword,
      UsersController.login,
    );
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
