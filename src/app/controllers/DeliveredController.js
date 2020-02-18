import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';

class DeliveredController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const { id } = req.params;

    // Search query
    const deliverymanExists = await Deliveryman.findByPk(id);

    // Checking if the deliveryman exists
    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman ID does not exist.' });
    }

    // Search query
    const deliveries = await Delivery.findAll({
      limit: 20,
      offset: (page - 1) * 20,
      order: [['id', 'ASC']],
      where: {
        deliveryman_id: id,
        start_date: { [Op.ne]: null },
        end_date: { [Op.ne]: null },
        canceled_at: null,
      },
    });

    return res.json(deliveries);
  }
}

export default new DeliveredController();
