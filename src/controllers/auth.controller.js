const jsonwebtoken = require('jsonwebtoken');

const {PRIVATE_KEY, user} = require('../../auth');

exports.public = (_, resp) => 
  resp.status(200).json({
    message: "testando rota publica",
  });

exports.login = (req, resp) => {
  const [, hash] = req.headers.authorization ? req.headers.authorization.split(" ") : ["", ""];
  const email = req.body.email;
  const password = req.body.password;

  try {
    const correctPassword = email === "lucas.sn@email.com" && password === "12345";

    if (!correctPassword) {
      return resp.status(401).send("senha ou email inválidos");
    }

    const user = { email };  // Definindo o objeto `user` com os dados do usuário

    const token = jsonwebtoken.sign(
      { user: JSON.stringify(user) },
      PRIVATE_KEY,
      {
        expiresIn: "60m"
      }
    );

    return resp.status(200).json({ data: { user, token } });
  } catch (error) {
    console.log(error);
    return resp.status(500).send("Ocorreu um erro no servidor.");
  }
};

exports.private = (req, resp)=>{
const {user} = req.headers;
const currentUser = JSON.parse(user);
return resp.status(200).json({
    message: "Rota privada",
        userLogged: currentUser
})

}