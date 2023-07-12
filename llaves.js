require('dotenv').config()

module.exports = {
  llave:process.env.JWT_LLAVE,
  email:process.env.EMAIL,
  clave:process.env.PASSWORD_EMAIL
}
