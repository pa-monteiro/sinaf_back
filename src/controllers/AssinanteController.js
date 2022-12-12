import db from '../models'

const Assinante = db.assinantes;

class AssinanteController {
    async get(req, res){
        const assinante = await Assinante.findByPk(req.userId, {
            include: [ {
                model: db.contrato,
                as: 'contrato',
                include:  db.produto 
        }]
        });

        return res.json(assinante);
    }
}

export default new AssinanteController();