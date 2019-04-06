const bcrypt = require("bcryptjs");

const db = require("../../data/config");

module.exports = {
  addUser
};

async function addUser(user, role_id) {
  user.password = bcrypt.hashSync(user.password, 8);

  if (role_id === 1) {
    try {
      const count = await db("accounts").insert(user);
      if (count) {
        const { id: account_id } = await db("accounts")
          .select("id")
          .where({ email: user.email })
          .first();
        console.log("FOUND ACCOUNT_ID, RETURNING", account_id);

        return db("students").insert({ account_id });
      }
    } catch (error) {
      console.log("CATCH IN ADDUSER");
      return false;
    }
  } else {
    return db("accounts").insert(user);
  }
}
