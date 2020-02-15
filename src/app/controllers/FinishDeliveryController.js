import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';
import File from '../models/File';

class FinishDeliveryController {
  async update(req, res) {
    const { deliveryman_id, delivery_id } = req.params;

    if (!req.file) {
      return res
        .status(400)
        .json({ error: 'You must send a signature picture.' });
    }

    const { filename: path, originalname: name } = req.file;

    const deliverymanExists = await Deliveryman.findByPk(deliveryman_id);

    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman ID does not exist.' });
    }

    const deliveryExists = await Delivery.findByPk(delivery_id, {
      include: {
        model: Deliveryman,
        as: 'deliveryman',
        attributes: ['id'],
      },
    });

    if (!deliveryExists) {
      return res.status(400).json({ error: 'Delivery ID does not exist.' });
    }
    if (deliveryExists.deliveryman.id !== Number(deliveryman_id)) {
      return res.status(400).json({
        error: `You cannot deliver other people's delivery.`,
      });
    }
    if (deliveryExists.canceled_at) {
      return res.status(400).json({
        error: 'Delivery has been canceled.',
      });
    }
    if (deliveryExists.end_date) {
      return res.status(400).json({
        error: 'Product has already been delivered.',
      });
    }

    const file = await File.create({
      name,
      path,
    });

    const delivery = deliveryExists;

    const updatedDelivery = await delivery.update({
      end_date: new Date(),
      signature_id: file.id,
    });

    return res.json(updatedDelivery);
  }
}

export default new FinishDeliveryController();
