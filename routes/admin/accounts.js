const db = require("../../data/config");

module.exports = {
  getAccounts
};

function getAccounts() {
  return new Promise(async (resolve, reject) => {
    try {
      let accounts = await db("accounts")
        .select(
          "accounts.id",
          "accounts.email",
          "accounts.first_name",
          "accounts.last_name",
          "accounts.verified_student",
          "accounts.role_id",
          "roles.role"
        )
        .innerJoin("roles", "accounts.role_id", "roles.id");
      if (accounts) {
        const role_options = await db("roles").select("id as role_id", "role");
        const mergedFields = accounts.map(account => ({
          ...account,
          role_options
        }));
        resolve(mergedFields);
      } else {
        reject();
      }
    } catch (error) {
      reject();
    }
  });
}
