import * as Yup from 'yup';
import db from "../models";

const Assinante = db.assinantes;

class AuthController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        cpf: Yup.string()
          .required(),
        data_nascimento: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' });
      }

      const { cpf, data_nascimento } = req.body;
      const assinante = await Assinante.findOne({
        where: {
          cpf,
          data_nascimento
        }
      });

      if (!assinante) {
        throw new Error('Usuário não encontrado.');
      }

      if(!assinante || assinante.status === 'cancelado'){
        return res.status(400).json({ error: 'Usuário não encontrado' });

      }

      if(assinante.primeiro_acesso) assinante.primeiro_acesso = false;
      if(assinante.status === 'pendente') assinante.status = 'confirmado';


      assinante.save();

      return res.json({
        assinante,
        token: assinante.generateToken(),
      });
    } catch (err) {
      return res.status(500).send({
        error: err.message,
        msg: err.message,
      });
    }
  }

  async primeiroAcesso(req,res) {
    try {
      const schema = Yup.object().shape({
        cpf: Yup.string()
          .required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' });
      }

      const { cpf } = req.body;
      
      const cpfFormatted = cpf.match(/\d+/g).join('');

      const assinante = await Assinante.findOne({
        where: {
          cpf: cpfFormatted
        }
      });

      if(!assinante || assinante.status === 'cancelado'){
        return res.status(400).json({ error: 'Usuário não encontrado' });

      }

      if(assinante.primeiro_acesso) assinante.primeiro_acesso = false;
      if(assinante.status === 'pendente') assinante.status = 'confirmado';


      assinante.save();
      
      return res.json({
        assinante,
        token: assinante.generateToken(),
      });

    } catch (error) {
       return res.status(500).send({
        error: error.message,
        msg: error.message,
      });
    }
  }
}

export default new AuthController();
