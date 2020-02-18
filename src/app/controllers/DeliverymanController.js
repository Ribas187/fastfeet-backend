import * as Yup from 'yup';

import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    // Search query
    const deliverymen = await Deliveryman.findAll({
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(deliverymen);
  }

  async show(req, res) {
    const { id } = req.params;

    // Search query
    const deliveryman = await Deliveryman.findByPk(id, {
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    // Checking if the deliveryman exists
    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exists.' });
    }

    return res.json(deliveryman);
  }

  async store(req, res) {
    // Fields validation
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error:
          'Validation failed. Check if all the fields are correctly filled.',
      });
    }

    // Search query
    const deliverymanExists = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    // Checking if the user exists
    if (deliverymanExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email } = await Deliveryman.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    // Fields validation
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error:
          'Validation failed, check if all the fields are correctly filled.',
      });
    }

    const { id } = req.params;

    // Search query
    const deliverymanExists = await Deliveryman.findByPk(id);

    // Checking if the deliveryman exists
    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman does not exist.' });
    }

    const deliverymanUpdated = await deliverymanExists.update(req.body);

    return res.json(deliverymanUpdated);
  }

  async delete(req, res) {
    const { id } = req.params;

    // Checking if the deliveryman id was provided
    if (!id) {
      return res.status(400).json({ error: 'Id not provided.' });
    }

    // Search query
    const deliveryman = await Deliveryman.findByPk(id);

    // Checking if the deliveryman exists
    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exist.' });
    }

    await deliveryman.destroy();

    return res.send(200);
  }
}

export default new DeliverymanController();
