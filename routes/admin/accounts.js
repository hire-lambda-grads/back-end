const db = require("../../data/config");

module.exports = {
  deleteAccount,
  getAccounts,
  updateAccount
};

function deleteAccount(id) {
  return db("accounts")
    .where({ id })
    .del();
}

function getAccounts() {
  return new Promise(async (resolve, reject) => {
    let accounts, role_options;
    await db.transaction(async t => {
      try {
        accounts = await db("accounts")
          .select(
            "accounts.id",
            "accounts.email",
            "accounts.first_name",
            "accounts.last_name",
            "accounts.verified_student",
            "accounts.role_id",
            "roles.role"
          )
          .innerJoin("roles", "accounts.role_id", "roles.id")
          .transacting(t);

        role_options = await db("roles")
          .select("id as role_id", "role")
          .transacting(t);
      } catch (error) {
        t.rollback();
        reject(error);
      }
    });
    margedFields = accounts.map(account => ({
      ...account,
      role_options
    }));
    resolve(mergedFields);
  });
}

function updateAccount(id, info) {
  return new Promise(async (resolve, reject) => {
    try {
      const count = await db("accounts")
        .where({ id })
        .update(info);
      if (count) {
        resolve(
          db("accounts")
            .select(
              "id",
              "email",
              "first_name",
              "last_name",
              "verified_student",
              "role_id"
            )
            .where({ id })
            .first()
        );
      } else {
        reject();
      }
    } catch (error) {
      reject();
    }
  });
}
