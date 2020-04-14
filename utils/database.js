const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("emailverify", "root", "1234", {
  host: "localhost",
  dialect: "mysql"
});

module.exports = sequelize;