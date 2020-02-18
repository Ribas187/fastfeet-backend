import Mail from '../../lib/Mail';

// Class to configure the email
class CancelDeliveryMail {
  get key() {
    return 'CancelDeliveryMail';
  }

  async handle({ data }) {
    const { delivery, deliveryman, recipient } = data;

    // Sendind email
    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Cancelamento de encomenda.',
      template: 'cancelDelivery',
      context: {
        deliveryman: deliveryman.name,
        product: delivery.product,
        recipient: recipient.name,
        street: recipient.street,
        number: recipient.number,
        complement: recipient.complement,
        city: recipient.city,
        state: recipient.state,
        postcode: recipient.postcode,
      },
    });
  }
}

export default new CancelDeliveryMail();
