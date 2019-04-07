const db = require("../../data/config");

module.exports = {
  findUser
};

async function findUser(email) {
  return db("accounts")
    .innerJoin("roles", "accounts.role_id", "roles.id")
    .where({ "accounts.email": email })
    .first();
}
