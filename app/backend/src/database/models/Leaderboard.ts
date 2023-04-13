import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Leaderboard extends Model {
  declare name: string;
  declare totalPoints: number;
  declare totalGames: number;
  declare totalVictories: number;
  declare totalDraws: number;
  declare totalLosses: number;
  declare goalsFavor: number;
  declare goalsOwn: number;
  declare goalsBalance: number;
  declare efficiency: number;
}

Leaderboard.init({
  name: {
    type: STRING,
    allowNull: false,
    primaryKey: true,
  },
  totalPoints: {
    type: INTEGER,
    allowNull: false,
  },
  totalGames: {
    type: INTEGER,
    allowNull: false,
  },
  totalVictories: {
    type: INTEGER,
    allowNull: false,
  },
  totalDraws: {
    type: INTEGER,
    allowNull: false,
  },
  totalLosses: {
    type: INTEGER,
    allowNull: false,
  },
  goalsFavor: {
    type: INTEGER,
    allowNull: false,
  },
  goalsOwn: {
    type: INTEGER,
    allowNull: false,
  },
  goalsBalance: {
    type: INTEGER,
    allowNull: false,
  },
  efficiency: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Leaderboard',
  timestamps: false,
});

export default Leaderboard;
