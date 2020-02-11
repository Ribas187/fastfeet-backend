import * as Yup from 'yup';
import cep from 'cep-promise';

import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const recipient = await Recipient.findAll();

    return res.json(recipient);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string(),
      number: Yup.number()
        .positive()
        .required(),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      postcode: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation Fails. Check if all the fields are correctly filled',
      });
    }

    const { name, number, postcode, complement = null } = req.body;

    const recipientExists = await Recipient.findOne({
      where: { name, number, postcode },
    });

    if (recipientExists) {
      return res.status(400).json({
        error: 'Recipient already exists.',
      });
    }

    const cepAddress = await cep(postcode).catch(() => null);

    if (!cepAddress) {
      return res.status(400).json({ error: 'Invalid postcode.' });
    }

    const { state, city, street } = cepAddress;

    const { id } = await Recipient.create({
      name,
      street,
      city,
      state,
      number,
      complement,
      postcode,
    });

    return res.json({
      id,
      name,
      street,
      city,
      state,
      number,
      complement,
      postcode,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.number().positive(),
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

    if (!recipient) {
      return res.status(400).json({ error: 'User does not exist.' });
    }

    const { postcode, name, number } = req.body;

    const cepAddress = await cep(postcode).catch(() => null);

    if (!cepAddress) {
      return res.status(400).json({ error: 'Invalid postcode.' });
    }

    const { state, city, street, complement } = cepAddress;

    const updated = await recipient.update({
      name,
      street,
      city,
      state,
      number,
      complement,
      postcode,
    });

    return res.json(updated);
  }

  async delete(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    await recipient.destroy();

    return res.send(200);
  }
}

export default new RecipientController();
