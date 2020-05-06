import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
        },
        path: Sequelize.STRING,
        user_id: {
          type: Sequelize.STRING,
          unique: {
            msg: 'User already has one photo.',
          },
        },
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.HOST}/files/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static assossiate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'Photo' });
  }
}

export default File;
