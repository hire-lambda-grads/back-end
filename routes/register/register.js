const bcrypt = require("bcryptjs");

const db = require("../../data/config");

module.exports = {
  addUser
};

function addUser(user) {
  user.password = bcrypt.hashSync(user.password, 8);

  return new Promise(async (resolve, reject) => {
    try {
      const count = await db("accounts").insert(user);
      if (count) {
        const { id: account_id } = await db("accounts")
          .select("id")
          .where({ email: user.email })
          .first();
        resolve(db("students").insert({ account_id }));
      } else {
        throw new Error(
          "Something went wrong adding the account as a student."
        );
      }
    } catch (error) {
      reject(error);
    }
  });
}
