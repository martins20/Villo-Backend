import crypto from 'crypto';

import User from '../models/User';
import Conversation from '../models/Conversation';
import Photo from '../models/File';

class ConversationController {
  async show(req, res) {
    try {
      const { userId } = req;
      const { id } = req.params;

      const chat = await Conversation.findByPk(id, {
        where: {
          user_id: userId,
        },
        attributes: [
          'id',
          'user_id',
          'friend',
          'messages',
          'last_message',
          'last_message_date',
        ],
      });

      if (!chat)
        return res
          .status(404)
          .json({ error: 'cannot find this conversation.' });

      const { user_id } = chat;

      if (userId && user_id)
        return res
          .status(401)
          .json({ error: 'not allower to see this conversation' });

      return res.json(chat);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async index(req, res) {
    try {
      const { userId } = req;

      const conversations = await Conversation.findAll({
        where: { user_id: userId },
        attributes: [
          'id',
          'user_id',
          'friend',
          'messages',
          'last_message',
          'last_message_date',
        ],
      });

      return res.json({ conversationList: conversations });
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async store(req, res) {
    try {
      const { userId } = req;
      const { id } = req.params;
      const { text } = req.body;

      const existingConversation = await Conversation.findOne({
        where: {
          user_id: userId,
          friend: { id },
        },
      });

      if (existingConversation)
        return res.status(401).json({ error: 'conversation already exists' });

      const { name: userName, friends, photo: userPhoto } = await User.findByPk(
        userId,
        {
          include: {
            model: Photo,
            attributes: ['path'],
            as: 'photo',
          },
        }
      );

      const friend = await User.findByPk(id, {
        include: {
          model: Photo,
          attributes: ['id', 'path', 'url'],
          as: 'photo',
        },
      });

      if (!friend) return res.status(404).json({ error: 'cannot find user.' });

      const { name: friendName, photo: friendPhoto } = friend;

      if (!text)
        return res.status(400).json({ error: 'cannot send an empty message.' });

      if (userId === id)
        return res
          .status(401)
          .json({ error: 'cannot send a message for yourself.' });

      if (!friends.includes(id))
        return res
          .status(401)
          .json({ error: 'cannot send a message for a stranger.' });

      const userConversation = await Conversation.create({
        user_id: userId,
        friend: {
          id,
          name: friendName,
          photo:
            friendPhoto === null
              ? null
              : `${process.env.HOST}/files/${userPhoto.path}`,
        },
        messages: [
          {
            id: await crypto.randomBytes(20).toString('HEX'),
            sender: {
              id: userId,
              name: userName,
            },
            receptor_id: id,
            text,
            messageTime: Date(),
          },
        ],
        last_message: text,
        last_message_date: Date(),
      });

      const existingFriendConversation = await Conversation.findOne({
        where: {
          user_id: id,
          friend: { id: userId },
        },
      });

      if (existingFriendConversation) return res.json(userConversation);

      await Conversation.create({
        user_id: id,
        friend: {
          id: userId,
          name: userName,
          photo:
            userPhoto === null
              ? null
              : `${process.env.HOST}/files/${userPhoto.path}`,
        },
        messages: [
          {
            id: await crypto.randomBytes(20).toString('HEX'),
            sender: {
              id,
              name: friendName,
            },
            receptor_id: userId,
            text,
            messageTime: Date(),
          },
        ],
        last_message: text,
        last_message_date: Date(),
      });

      return res.json(userConversation);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async update(req, res) {
    try {
      const { userId } = req;
      const { text } = req.body;
      const { id } = req.params;

      const userConversation = await Conversation.findByPk(id, {
        where: { user_id: userId },
      });

      if (!userConversation)
        return res.status(404).json({ error: 'cannot find conversation.' });

      if (!text)
        return res.status(401).json({ error: 'cannot send an empty message.' });
      const {
        user_id,
        friend: userFriend,
        messages: userMessages,
      } = userConversation;

      const { photo: userPhoto, name: userName } = await User.findByPk(
        userFriend.id,
        {
          include: {
            model: Photo,
            attributes: ['path'],
            as: 'photo',
          },
        }
      );

      const updatedUserConversation = await userConversation.update({
        friend: {
          id: userFriend.id,
          name: userFriend.name,
          photo:
            userPhoto === null
              ? null
              : `${process.env.HOST}/files/${userPhoto.path}`,
        },
        messages: [
          ...userMessages,
          {
            id: await crypto.randomBytes(20).toString('HEX'),
            sender: {
              id: user_id,
              name: userName,
            },
            receptor_id: userFriend.id,
            text,
            messageTime: Date(),
          },
        ],
        last_message: text,
        last_message_date: Date(),
      });

      const { photo: friendPhoto, name: friendName } = await User.findOne({
        id: userFriend.id,
        include: {
          model: Photo,
          attributes: ['path'],
          as: 'photo',
        },
      });

      const friendConversation = await Conversation.findOne({
        where: { user_id: userFriend.id, friend: { id: userId } },
      });

      const {
        user_id: friend_id,
        friend: _friend,
        messages: friendMessages,
      } = friendConversation;

      await friendConversation.update({
        friend: {
          id: _friend.id,
          name: _friend.name,
          photo:
            friendPhoto === null
              ? null
              : `${process.env.HOST}/files/${friendPhoto.path}`,
        },
        messages: [
          ...friendMessages,
          {
            id: await crypto.randomBytes(20).toString('HEX'),
            sender: {
              id: friend_id,
              name: friendName,
            },
            receptor_id: _friend.id,
            text,
            messageTime: Date(),
          },
        ],
        last_message: text,
        last_message_date: Date(),
      });

      return res.json(updatedUserConversation);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async delete(req, res) {
    try {
      const { userId } = req;
      const { id } = req.params;

      const userConversation = await Conversation.findByPk(id, {
        where: {
          user_id: userId,
        },
      });

      if (!userConversation)
        return res.json({ error: 'cannot find conversation' });

      await userConversation.destroy();

      return res.json();
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

export default new ConversationController();
