import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const recipient = await Recipient.findAll();

    return res.json(recipient);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      postcode: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation Fails. Check if all the fields are correctly filled',
      });
    }

    const { name, number, postcode } = req.body;

    const recipientExists = await Recipient.findOne({
      where: { name, number, postcode },
    });

    if (recipientExists) {
      return res.status(400).json({
        error: 'Recipient already exists.',
      });
    }

    const { id } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      number,
      postcode,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.number(),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      postcode: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error:
          'Validation Fails. Check if all the fields are correctly filled.',
      });
    }
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    const updated = await recipient.update(req.body);

    return res.json(updated);
  }
}

export default new RecipientController();
