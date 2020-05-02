import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.STRING,
          primaryKey: true,
        },
        name: Sequelize.STRING,
        age: {
          type: Sequelize.INTEGER,
          validate: {
            min: {
              args: 16,
              msg: 'age must be over 16.',
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          unique: {
            msg: 'email already exists.',
          },
          validate: {
            isEmail: {
              msg: 'invalid email.',
            },
          },
        },
        password: {
          type: Sequelize.VIRTUAL,
          validate: {
            len: {
              args: [3, 50],
              msg: 'password must be between 3 and 50 characters.',
            },
          },
        },
        password_hash: Sequelize.STRING,
        phone: {
          type: Sequelize.STRING,
          unique: {
            msg: 'phone already exists.',
          },
          validate: {
            len: {
              args: [11, 11],
              msg: 'invalid Phone.',
            },
          },
        },
        friends: {
          type: Sequelize.ARRAY(Sequelize.STRING),
          defaultValue: [],
        },
      },
      {
        sequelize,
      }
    );

    // antes de salvar um usuario pega o password do req.body e gera o valor de password_hash
    this.addHook('beforeSave', async (user) => {
      if (user.password)
        user.password_hash = await bcrypt.hash(user.password, 4);
      user.id = await crypto.randomBytes(20).toString('HEX');
    });

    return this;
  }

  static associate(models) {
    this.hasOne(models.File, {
      foreignKey: 'user_id',
      as: 'photo',
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}
