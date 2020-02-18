import * as Yup from 'yup';

import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import Queue from '../../lib/Queue';
import NewDeliveryMail from '../jobs/NewDeliveryMail';

class DeliveryController {
  async index(req, res) {
    const { page = 1 } = req.query;

    // Search query
    const deliveries = await Delivery.findAll({
      limit: 20,
      offset: (page - 1) * 20,
      order: [['id', 'ASC']],
      attributes: ['id', 'product', 'start_date', 'end_date', 'canceled_at'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'postcode',
          ],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(deliveries);
  }

  async show(req, res) {
    const { id } = req.params;

    // Search query
    const delivery = await Delivery.findByPk(id, {
      attributes: ['id', 'product', 'start_date', 'end_date', 'canceled_at'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'postcode',
          ],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    // Checking if the delivery exists
    if (!delivery) {
      return res.json({ error: 'Delivery does not exist.' });
    }

    return res.json(delivery);
  }

  async store(req, res) {
    // Fields validation
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error:
          'Validation failed. Check if all the fields are correctly filled.',
      });
    }

    const delivery = await Delivery.create(req.body);

    // Search query
    const deliveryman = await Deliveryman.findByPk(delivery.deliveryman_id);
    const recipient = await Recipient.findByPk(delivery.recipient_id);

    // Sending email
    await Queue.add(NewDeliveryMail.key, { deliveryman, recipient, delivery });

    return res.json(delivery);
  }

  async update(req, res) {
    // Fields validation
    const schema = Yup.object().shape({
      product: Yup.string(),
      start_date: Yup.date(),
      end_date: Yup.date(),
      canceled_at: Yup.date(),
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      signature_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error:
          'Validation Fails. Check if all the fields are correctly filled.',
      });
    }

    const { id } = req.params;

    // Search query
    const deliveryExist = await Delivery.findByPk(id);

    // Checking if the delivery exists
    if (!deliveryExist) {
      return res.status(400).json({
        error: 'Delivery does not exist.',
      });
    }

    const updatedDelivery = await deliveryExist.update(req.body);

    return res.json(updatedDelivery);
  }

  async delete(req, res) {
    const { id } = req.params;

    // Checking if the delivery id was provided
    if (!id) {
      return res.status(400).json({ error: 'Id not provided.' });
    }

    // Search query
    const delivery = await Delivery.findByPk(id);

    // Checking if the delivery exists
    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exist.' });
    }

    await delivery.destroy();

    return res.send(200);
  }
}

export default new DeliveryController();
