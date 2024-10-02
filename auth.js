const jsonwebtoken = require('jsonwebtoken');

exports.PRIVATE_KEY = '1010FFF';
exports.user = {

    name:'Lucas Notaro',
    email:'lucas.sn@email.com'
};

exports.tokenValited = (request, response, next)=>{
    const[,token] = request.headers.autorization?.split("") || [" ", " "];
    if(token)
        return response.status(401).send("Acesso negado, nenhum token fornecido")

try{
    const payload = jsonwebtoken.verify(token, this.private_key);
    const userIdToken = typeof payload != "string" && payload.user;

    if(!this.user && userIdToken){
        return response.send(401).json({
            message: 'token invalido'
        })

    }
    request.header['user'] = payload.user;
    return next();
    }catch(error){
        console.log(error);
        return response.status(401).json({message:'token invalido'})
    }

}