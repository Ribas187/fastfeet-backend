import Sequelize, { Model } from 'sequelize';

// DeliveryProblem model
class DeliveryProblem extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.TEXT,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  // Making the relationships
  static associate(models) {
    this.belongsTo(models.Delivery, {
      foreignKey: 'delivery_id',
      as: 'delivery',
    });
  }
}

export default DeliveryProblem;
