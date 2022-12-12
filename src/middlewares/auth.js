const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if(!authHeader)
    return res.status(401).send({ mensagem: 'Não autorizado'}); 

    const partes = authHeader.split(' ');

    if(!partes.length === 2)
        return res.status(401).send({ mensagem: 'Não autorizado'});

    const [ bearer, token ] = partes;
    
    if(!/^Bearer$/i.test(bearer))
        return res.status(401).send({ mensagem: 'Não autorizado'}); 

    jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
        if(err)
            return res.status(401).send({ mensagem: 'Não autorifdsfdszado'});   

    jwt.verify(token, authHeader, (err, result) => { 
        if(result)
        return res.status(401).send({ mensagem: 'Sessão Inválida'});
    });

        req.userId = decoded.id;

        return next();            
    })
}