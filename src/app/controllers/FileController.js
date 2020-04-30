import File from '../models/File';

class FileController {
  async show(req, res) {
    try {
      const { userId } = req;

      const photo = await File.findOne({ user_id: userId });

      return res.json(photo);
    } catch (err) {
      return res
        .status(400)
        .json({ error: err.errors.map((error) => error.message) });
    }
  }

  async store(req, res) {
    try {
      const { originalname: name, filename: path } = req.file;
      const { userId } = req;

      const newPhoto = await File.create({
        name,
        path,
        user_id: userId,
      });

      return res.json(newPhoto);
    } catch (err) {
      return res
        .status(400)
        .json({ error: err.errors.map((error) => error.message) });
    }
  }

  async update(req, res) {
    try {
      const { userId } = req;
      const { originalname: name, filename: path } = req.file;

      const photo = await File.findOne({ user_id: userId });

      if (!photo)
        return res
          .status(400)
          .json({ error: 'cannot update, with null value' });

      const newPhoto = await photo.update({
        name,
        path,
      });
      return res.json(newPhoto);
    } catch (err) {
      return res
        .status(400)
        .json({ error: err.errors.map((error) => error.message) });
    }
  }

  async delete(req, res) {
    try {
      const { userId } = req;

      const photo = await File.findOne({ user_id: userId });

      if (!photo)
        return res
          .status(400)
          .json({ error: 'cannot delete, with null value.' });

      await File.findByPk(photo.id);

      photo.destroy();

      return res.json();
    } catch (err) {
      return res
        .status(400)
        .json({ error: err.errors.map((error) => error.message) });
    }
  }
}

export default new FileController();
