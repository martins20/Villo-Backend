import User from '../models/User';
import Photo from '../models/File';

class FriendController {
  async index(req, res) {
    try {
      const { userId } = req;

      const { friends } = await User.findByPk(userId);

      return res.json({ friends });
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  async store(req, res) {
    try {
      const { email } = req.body;
      const { userId } = req;

      const user = await User.findByPk(userId, {
        attributes: ['id', 'name', 'age', 'email', 'phone', 'friends'],
        include: {
          model: Photo,
          attributes: ['id', 'path', 'url'],
          as: 'photo',
        },
      });

      const friend = await User.findOne({ where: { email } });

      if (!friend)
        return res.status(404).json({ error: `${email} not exists.` });

      if (email === user.email)
        return res.status(401).json({ error: 'cannot add your own email.' });

      const check = user.friends.includes(friend.id);

      if (check)
        return res.status(401).json({ error: 'friend already exists.' });

      await user.update({
        friends: [...user.friends, friend.id],
      });

      return res.json(user);
    } catch (err) {
      return res.statu(501).json(err);
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    const { userId } = req;

    const user = await User.findByPk(userId);

    const friend = await User.findOne({ where: { id } });

    if (!friend) return res.status(404).json({ error: `user not exists.` });

    if (id === user.id)
      return res.status(401).json({ error: 'invalid operation' });

    const check = user.friends.includes(friend.id);

    if (!check) return res.status(400).json({ error: 'friend not exists.' });

    await user.update({
      friends: user.friends.filter((item) => item !== id),
    });

    return res.json();
  }
}

export default new FriendController();
