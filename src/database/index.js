import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/User';

const models = [User];

const connection = new Sequelize(databaseConfig);

models.map((model) => model.init(connection));

models.map((model) => model.associate && model.associate(connection.models));
