const db = require("../../data/config");

module.exports = {
  deleteAccount,
  getAccount,
  updateAccount
};

function deleteAccount(id) {
  return "accounts".where({ id }).del();
}

function getAccount(id) {
  return db("accounts")
    .select(
      "accounts.email",
      "accounts.first_name",
      "accounts.last_name",
      "accounts.verified_student",
      "roles.role"
    )
    .where({ "accounts.id": id })
    .innerJoin("roles", "roles.id", "accounts.role_id")
    .first();
}

function updateAccount(id, info) {
  return new Promise(async (resolve, reject) => {
    try {
      await db("accounts")
        .where({ id })
        .update(info);

      resolve(
        db("accounts")
          .select(
            "accounts.email",
            "accounts.first_name",
            "accounts.last_name",
            "accounts.verified_student",
            "roles.role"
          )
          .where({ "accounts.id": id })
          .innerJoin("roles", "roles.id", "accounts.role_id")
          .first()
      );
    } catch (error) {
      reject();
    }
  });
}
