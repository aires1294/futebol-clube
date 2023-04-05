'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      homeTeamId: {
          allowNull: false,
          field: 'home_team_id',
          type: Sequelize.INTEGER
      },
      homeTeamGoals: {
        allowNull: false,
        field: 'home_team_goals',
        type: Sequelize.INTEGER
      },
      awayTeamId: {
        allowNull: false,
        field: 'away_team_id',
        type: Sequelize.INTEGER
      },
      awayTeamGoals: {
        allowNull: false,
        field: 'away_team_goals',
        type: Sequelize.INTEGER
      },
      inProgress: {
        allowNull: false,
        field: 'in_progress',
        type: Sequelize.BOOLEAN
      }
  
  
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};
