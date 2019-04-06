const db = require("../../data/config");

module.exports = {
  findUser
};

async function findUser(email) {
  return db("accounts")
    .where({ email })
    .first();
}
