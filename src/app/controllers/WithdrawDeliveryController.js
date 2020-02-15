import { startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';

import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';

class WithdrawDeliveryController {
  async update(req, res) {
    const { deliveryman_id, delivery_id } = req.params;

    const deliverymanExists = await Deliveryman.findByPk(deliveryman_id);

    if (!deliverymanExists) {
      return res.json({ error: 'Deliveryman ID does not exist.' });
    }

    const deliveryExists = await Delivery.findByPk(delivery_id, {
      include: {
        model: Deliveryman,
        as: 'deliveryman',
        attributes: ['id'],
      },
    });

    if (!deliveryExists) {
      return res.json({ error: 'Delivery ID does not exist.' });
    }
    if (deliveryExists.deliveryman.id !== Number(deliveryman_id)) {
      return res.json({
        error: `You cannot withdraw other people's delivery.`,
      });
    }
    if (deliveryExists.canceled_at) {
      return res.json({
        error: 'Delivery has been canceled.',
      });
    }
    if (deliveryExists.start_date) {
      return res.json({
        error: 'Delivery has already been withdrawn.',
      });
    }
    if (deliveryExists.end_date) {
      return res.json({
        error: 'Delivery has already been delivered.',
      });
    }

    const withdrawHour = 10;

    if (withdrawHour < 8 || withdrawHour > 18) {
      return res.json({
        error: 'You can only withdraw from 08:00h to 18:00h.',
      });
    }

    const today = 1581729334000;

    const todayWithdraws = await Delivery.findAll({
      where: {
        deliveryman_id,
        start_date: {
          [Op.between]: [startOfDay(today), endOfDay(today)],
        },
      },
    });

    if (todayWithdraws.length >= 5) {
      return res.json({
        error: 'You can only withdraw up to 5 deliveries per day',
      });
    }

    const delivery = deliveryExists;

    const updatedDelivery = await delivery.update({
      start_date: new Date(),
    });

    return res.json(updatedDelivery);
  }
}

export default new WithdrawDeliveryController();
