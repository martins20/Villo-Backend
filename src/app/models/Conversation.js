import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

export default class Conversation extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.STRING,
          primaryKey: true,
        },
        user_id: Sequelize.STRING,
        friend: Sequelize.JSON,
        messages: Sequelize.ARRAY(Sequelize.JSON),
        last_message: Sequelize.STRING,
        last_message_date: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    // antes de salvar um usuario pega o password do req.body e gera o valor de password_hash
    this.addHook('beforeSave', async (conversation) => {
      conversation.id = await crypto.randomBytes(25).toString('HEX');
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}
