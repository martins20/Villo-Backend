import jwt from 'jsonwebtoken';

import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(401).json({ error: 'user not found.' });

    if (!(await user.checkPassword(password)))
      return res.status(401).json({ error: 'password does not match' });

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, process.env.SECRET, {
        expiresIn: '3d',
      }),
    });
  }
}

export default new SessionController();
