import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/User';
import File from '../app/models/File';

const models = [User, File];

const connection = new Sequelize(databaseConfig);

models.map((model) => model.init(connection));

models.map((model) => model.associate && model.associate(connection.models));
