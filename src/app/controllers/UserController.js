import User from '../models/User';
import Photo from '../models/File';

class UserController {
  async show(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id, {
        attributes: ['id', 'name', 'age', 'email', 'phone', 'friends'],
        include: {
          model: Photo,
          attributes: ['id', 'path', 'url'],
          as: 'photo',
        },
      });

      return res.json(user);
    } catch (err) {
      return res.status(501).json(err);
    }
  }

  async store(req, res) {
    try {
      const { id, name, age, email, phone, friends } = await User.create(
        req.body
      );

      return res.json({
        id,
        name,
        age,
        email,
        phone,
        friends,
      });
    } catch (err) {
      return res
        .status(400)
        .json({ error: err.errors.map((error) => error.message) });
    }
  }

  async update(req, res) {
    try {
      const { userId } = req;

      const user = await User.findByPk(userId);

      if (!user)
        return res
          .status(400)
          .json({ error: 'user not found, you must login again or register.' });

      const { id, name, age, email, phone } = await user.update(req.body);

      return res.json({ id, name, age, email, phone });
    } catch (err) {
      return res
        .status(400)
        .json({ error: err.errors.map((error) => error.message) });
    }
  }

  async delete(req, res) {
    try {
      const { userId } = req;

      const user = await User.findByPk(userId);

      if (!user)
        return res
          .status(400)
          .json({ error: 'user not found, you must login again or register.' });
      await user.destroy();

      return res.json();
    } catch (err) {
      return res
        .status(400)
        .json({ error: err.errors.map((error) => error.message) });
    }
  }
}

export default new UserController();
