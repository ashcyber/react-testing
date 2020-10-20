const Users = require("./users.model");
var ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
  createUser: async function (req, res) {
    try {
      const { firstName = "", lastName = "" } = req.body;
      const user = await Users.create({ firstName, lastName });
      return res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).end();
    }
  },
  getUsers: async function (req, res) {
    try {
      const users = await Users.find({});
      return res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).end();
    }
  },
  deleteUser: async function (req, res) {
    try {
      const id = req.params.id;

      if (!ObjectId.isValid(id)) {
        return res.status(400).end();
      }

      const isUserExists = await Users.exists({ _id: id });

      if (isUserExists) {
        const user = await Users.deleteOne({ _id: id });
        return res.json(user);
      }

      return res.status(400).send({ message: "user does not exists" });
    } catch (err) {
      console.log(err);
      return res.status(500).end();
    }
  },
};
